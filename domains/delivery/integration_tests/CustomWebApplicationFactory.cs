using System.Data.Common;
using Delivery.Repository;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Delivery.IntegrationTests;

public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    builder.ConfigureServices(services =>
    {
      var dbContextDescriptor = services.SingleOrDefault(
              d => d.ServiceType ==
                  typeof(DbContextOptions<DeliveryDbContext>));

      services.Remove(dbContextDescriptor!);

      var dbConnectionDescriptor = services.SingleOrDefault(
              d => d.ServiceType ==
                  typeof(DbConnection));

      services.Remove(dbConnectionDescriptor!);

      // Create open SqliteConnection so EF won't automatically close it.
      services.AddSingleton<DbConnection>(container =>
          {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            return connection;
          });

      services.AddDbContext<DeliveryDbContext>((container, options) =>
          {
            var connection = container.GetRequiredService<DbConnection>();
            options.UseSqlite(connection);
            options.UseSnakeCaseNamingConvention();
          });
    });

    builder.UseEnvironment("Development");


  }
}