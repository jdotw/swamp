using System.Text.Json;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Base.Repository;
using Xunit;
using Microsoft.Extensions.DependencyInjection;

namespace Base.IntegrationTests;

public class TestsBase<TSeed, TDbContext, TProgram>
    : IClassFixture<WebApplicationFactoryBase<TProgram, TDbContext>>
    where TSeed : ISeedDataClass<TDbContext>
    where TDbContext : DbContextBase
    where TProgram : class
{
  protected readonly WebApplicationFactoryBase<TProgram, TDbContext> _factory;
  protected readonly JsonSerializerOptions _options;
  protected readonly HttpClient _client;
  protected readonly TSeed _seedData = Activator.CreateInstance<TSeed>();

  public TestsBase(WebApplicationFactoryBase<TProgram, TDbContext> factory)
  {
    _factory = factory;
    _options = new JsonSerializerOptions()
    {
      PropertyNamingPolicy =
             new JsonSnakeCaseNamingPolicy()
    };
    _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
    {
      AllowAutoRedirect = false,
    });

    var sp = factory.Services;
    using (var scope = sp.CreateScope())
    {
      var db = scope.ServiceProvider.GetRequiredService<TDbContext>();
      // This will initiaze the per-Test-Class database
      // Note that the database is not dropped after each test
      db.Database.EnsureDeleted();
      db.Database.EnsureCreated();
      _seedData.InitializeDbForTests(db);
    }
  }
}

