using System.Data.Common;
using Base.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Base.IntegrationTests;

public class WebApplicationFactoryBase<TProgram, TDbContext>
    : WebApplicationFactory<TProgram>
      where TProgram : class
      where TDbContext : DbContextBase
{
  protected DbConnection dbConnection;

  public WebApplicationFactoryBase()
  {
    dbConnection = new SqliteConnection("Data Source=:memory:");
    dbConnection.Open();
  }

  protected override void Dispose(bool disposing)
  {
    base.Dispose(disposing);
    dbConnection.Close();
  }

  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    builder.ConfigureServices(services =>
    {
      var dbContextDescriptor = services.SingleOrDefault(
              d => d.ServiceType ==
                  typeof(DbContextOptions<TDbContext>));
      services.Remove(dbContextDescriptor!);

      var dbConnectionDescriptor = services.SingleOrDefault(
              d => d.ServiceType ==
                  typeof(DbConnection));
      services.Remove(dbConnectionDescriptor!);

      // Create open SqliteConnection so EF won't automatically close it.
      services.AddDbContext<TDbContext>((container, options) =>
      {
        // A new DbContext is created per-test, but note
        // that is uses the shared dbConnection that persists
        // across all tests in a given Test Class. 
        options.UseSqlite(dbConnection);
        options.UseSnakeCaseNamingConvention();
      });
    });

    builder.UseEnvironment("Development");
  }

}