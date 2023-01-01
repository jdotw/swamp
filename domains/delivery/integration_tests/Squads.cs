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

public class SquadTests
    : IClassFixture<CustomWebApplicationFactory<Program, SquadsSeedDataClass>>
{
  private readonly CustomWebApplicationFactory<Program, SquadsSeedDataClass> _factory;
  private readonly JsonSerializerOptions _options;
  private readonly HttpClient _client;

  private readonly string _path = "/tribes/1/squads";

  public SquadTests(CustomWebApplicationFactory<Program, SquadsSeedDataClass> factory)
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
  }

  private async Task<SquadDto?> CreateSquad(string name = "Test Squad")
  {
    var squad = await _client.PostAsJsonAsync(_path, new AddSquadDto { Name = name }, _options)
       .ContinueWith<SquadDto?>(t => t.Result.Content.ReadFromJsonAsync<SquadDto>(_options).Result);
    return squad;
  }

  [Fact]
  public async Task TestCreateSquad()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var name = "Test Squad Creation";

    // Act
    var squad = await CreateSquad(name);

    // Assert
    Assert.NotNull(squad);
    Assert.Equal(name, squad.Name);
    squad.FormedDate.Should().BeAfter(testStart);
    Assert.Null(squad.DisbandedDate);
  }

  [Fact]
  public async Task TestGetAllSquads()
  {
    // Arrange
    var name = "Seen In Get All";
    var squad = await CreateSquad(name);

    // Act
    var squads = await _client.GetFromJsonAsync<List<Squad>>($"{_path}", _options);

    // Assert
    Assert.NotNull(squads);
    Assert.Contains(squads, t => t.Name == name);
  }

  [Fact]
  public async Task TestGetSquad()
  {
    // Arrange
    var name = "Single Get Squad";
    var createdSquad = await CreateSquad(name);
    Assert.NotNull(createdSquad);

    // Act
    var squad = await _client.GetFromJsonAsync<SquadDto>($"{_path}/{createdSquad.Id}", _options);

    // Assert
    Assert.NotNull(squad);
    squad.Name.Should().Be(name);
  }

  [Fact]
  public async Task TestUpdateSquad()
  {
    // Arrange
    var existingSquadId = 1;  // Seeded for update
    var path = $"{_path}/{existingSquadId}";

    // Act
    var updateDto = new UpdateSquadDto
    {
      Name = "Updated Squad",
      DisbandedDate = DateTime.UtcNow
    };
    var response = await _client.PutAsJsonAsync(path, updateDto, _options);
    var updatedSquad = await _client.GetFromJsonAsync<Squad>(path, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.NotNull(updatedSquad);
    Assert.Equal(updateDto.Name, updatedSquad.Name);
    Assert.Equal(updateDto.DisbandedDate, updatedSquad.DisbandedDate);
  }

  [Fact]
  public async Task TestDeleteSquad()
  {
    // Arrange
    var existingSquadId = 2;  // Seeded for delete
    var path = $"{_path}/{existingSquadId}";

    // Act
    var response = await _client.DeleteAsync(path);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    // var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(() => _client.GetFromJsonAsync<Squad>(_path, _options));
    // Assert.Contains("404 (Not Found)", ex.Message);
  }
}

public class SquadsSeedDataClass : ISeedDataClass
{
  private readonly DeliveryDbContext _db;

  public SquadsSeedDataClass(DeliveryDbContext db)
  {
    _db = db;
  }

  public void InitializeDbForTests()
  {
    var result = _db.Tribes.Add(new Tribe
    {
      Name = "Existing Tribe",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null
    });
    _db.SaveChanges(true);

    var squadResult1 = _db.Squads.Add(new Squad
    {
      Name = "Squad To Be Updated",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null,
      TribeId = result.Entity.Id
    });
    _db.SaveChanges(true);

    var squadResult2 = _db.Squads.Add(new Squad
    {
      Name = "Squad To Be Deleted",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null,
      TribeId = result.Entity.Id
    });
    _db.SaveChanges(true);
  }
}

