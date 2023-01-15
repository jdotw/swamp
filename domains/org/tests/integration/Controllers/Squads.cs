using System.Net;
using System.Text.Json;
using Org.DTOs;
using Org.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class SquadTests
    : TestsBase<SquadsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  public SquadTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  private string Path(int tribeId) => $"/tribes/{tribeId}/squads";
  private string Path(int tribeId, int squadId) => $"/tribes/{tribeId}/squads/{squadId}";

  [Fact]
  public async Task TestCreateSquad()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var testStart = DateTime.UtcNow;
    var newSquad = new CreateSquadDto
    {
      Name = "Test Squad",
    };

    // Act
    var squad = await _client.PostAsJsonAsync(Path(tribeId), newSquad, _options)
      .ContinueWith<SquadDto?>(t => t.Result.Content.ReadFromJsonAsync<SquadDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, squad!.Id);
    Assert.Equal(newSquad.Name, squad.Name);
  }

  [Fact]
  public async Task TestGetAllSquads()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var existingSquad = _seedData.Squad;

    // Act
    var squads = await _client.GetFromJsonAsync<List<Squad>>(Path(tribeId), _options);

    // Assert
    Assert.Contains(squads!, t => t.Id == existingSquad.Id);
  }

  [Fact]
  public async Task TestGetSquad()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var existingSquad = _seedData.Squad;

    // Act
    Console.WriteLine("Path: " + Path(tribeId, existingSquad.Id));
    var squad = await _client.GetFromJsonAsync<SquadDto>(Path(tribeId, existingSquad.Id), _options);

    // Assert
    Assert.Equal(squad!.Id, existingSquad.Id);
    Assert.Equal(squad.Name, existingSquad.Name);
  }

  [Fact]
  public async Task TestUpdateSquad_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var existingSquad = _seedData.Squad;
    var updateDto = new UpdateSquadDto
    {
      Name = "new Name",
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(tribeId, existingSquad.Id), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateSquad_ForNonExistentSquad_ReturnsNotFound()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var nonExistentSquadId = 34252532;
    var existingSquad = _seedData.Squad;
    var updateDto = new UpdateSquadDto
    {
      Name = existingSquad.Name,
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(tribeId, nonExistentSquadId), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteSquad()
  {
    // Arrange
    var tribeId = _seedData.Tribe.Id;
    var squad = _seedData.Squad;

    // Act
    var response = await _client.DeleteAsync(Path(tribeId, squad.Id));

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class SquadsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Tribe Tribe = null!;
  public Squad Squad = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the SquadTests class.
    // The DB is not re-initialized between tests.
    Tribe = db.Tribes.Add(new Tribe
    {
      Name = "Tribe Name",
    }).Entity;
    db.SaveChanges(true);

    Squad = db.Squads.Add(new Squad
    {
      TribeId = Tribe.Id,
      Name = "Squad Name",
    }).Entity;
    db.SaveChanges(true);
  }
}