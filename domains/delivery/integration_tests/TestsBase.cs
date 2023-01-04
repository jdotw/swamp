using System.Net;
using System.Text.Json;
using Delivery.DTOs;
using Delivery.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using FluentAssertions;
using Delivery.Repository;

namespace Delivery.IntegrationTests;

public class TestsBase<TSeed>
    : IClassFixture<CustomWebApplicationFactory<Program>>
    where TSeed : ISeedDataClass
{
  protected readonly CustomWebApplicationFactory<Program> _factory;
  protected readonly JsonSerializerOptions _options;
  protected readonly HttpClient _client;
  protected readonly TSeed _seedData = Activator.CreateInstance<TSeed>();

  public TestsBase(CustomWebApplicationFactory<Program> factory)
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
      var db = scope.ServiceProvider.GetRequiredService<DeliveryDbContext>();
      // This will initiaze the per-Test-Class database
      // Note that the database is not dropped after each test
      db.Database.EnsureDeleted();
      db.Database.EnsureCreated();
      _seedData.InitializeDbForTests(db);
    }
  }
}

