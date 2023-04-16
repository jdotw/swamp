using Base.Repository;
using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Configurations;
using DotNet.Testcontainers.Containers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Base.IntegrationTests;

public class WebApplicationFactoryBase<TProgram, TDbContext>
    : WebApplicationFactory<TProgram>, IAsyncLifetime
      where TProgram : class
      where TDbContext : DbContextBase
{
  private readonly TestcontainerDatabase _container;

  public WebApplicationFactoryBase()
  {
    _container = new TestcontainersBuilder<PostgreSqlTestcontainer>()
        .WithDatabase(new PostgreSqlTestcontainerConfiguration
        {
          Database = "test_db",
          Username = "postgres",
          Password = "postgres",
        })
        .WithImage("postgres:11")
        .WithCleanUp(true)
        .Build();
  }


  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    builder.ConfigureServices(services =>
    {
      // Remove AppDbContext
      services.RemoveDbContext<TDbContext>();

      // Add DB context pointing to test container
      services.AddDbContext<TDbContext>(options =>
      {
        options.UseNpgsql(_container.ConnectionString);
        options.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
      });

      // Ensure schema gets created
      services.EnsureDbCreated<TDbContext>();
    });

    builder.UseEnvironment("Development");
  }

  public async Task InitializeAsync() => await _container.StartAsync();

  public new async Task DisposeAsync() => await _container.DisposeAsync();

}

public static class ServiceCollectionExtensions
{
  public static void RemoveDbContext<T>(this IServiceCollection services) where T : DbContext
  {
    var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<T>));
    if (descriptor != null) services.Remove(descriptor);
  }

  public static void EnsureDbCreated<T>(this IServiceCollection services) where T : DbContext
  {
    var serviceProvider = services.BuildServiceProvider();

    using var scope = serviceProvider.CreateScope();
    var scopedServices = scope.ServiceProvider;
    var context = scopedServices.GetRequiredService<T>();
    context.Database.EnsureCreated();
  }
}
