using System.Data.Common;
using Delivery.Entities;
using Delivery.Repository;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Delivery.IntegrationTests;

public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram>
      where TProgram : class
{
  private readonly DbConnection _connection;

  // Override the constructor
  public CustomWebApplicationFactory()
  {
    _connection = new SqliteConnection("Data Source=:memory:");
    _connection.Open();
  }

  protected override void Dispose(bool disposing)
  {
    base.Dispose(disposing);
    _connection.Close();
  }

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
      services.AddDbContext<DeliveryDbContext>((container, options) =>
      {
        // A new DbContext is created per-test, but note
        // that is uses the shared _connection that persists
        // across all tests in a given Test Class. 
        options.UseSqlite(_connection);
        options.UseSnakeCaseNamingConvention();
      });
    });

    builder.UseEnvironment("Development");
  }

}