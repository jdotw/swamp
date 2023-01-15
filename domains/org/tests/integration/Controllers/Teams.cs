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

public class TeamTests
    : TestsBase<TeamsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/teams";

  public TeamTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateTeam()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTeam = new CreateTeamDto
    {
      Name = "Test Team",
      Purpose = "Test Team Purpose"
    };

    // Act
    var team = await _client.PostAsJsonAsync(_path, newTeam, _options)
      .ContinueWith<TeamDto?>(t => t.Result.Content.ReadFromJsonAsync<TeamDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, team!.Id);
    Assert.Equal(newTeam.Purpose, team.Purpose);
  }

  [Fact]
  public async Task TestGetAllTeams()
  {
    // Arrange
    var existingTeam = _seedData.Team;

    // Act
    var teams = await _client.GetFromJsonAsync<List<Team>>($"{_path}", _options);

    // Assert
    Assert.Contains(teams!, t => t.Id == existingTeam.Id);
  }

  [Fact]
  public async Task TestGetTeam()
  {
    // Arrange
    var existingTeam = _seedData.Team;

    // Act
    var team = await _client.GetFromJsonAsync<TeamDto>($"{_path}/{existingTeam.Id}", _options);

    // Assert
    Assert.Equal(team!.Id, existingTeam.Id);
    Assert.Equal(team.Purpose, existingTeam.Purpose);
  }

  [Fact]
  public async Task TestUpdateTeam_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTeam = _seedData.Team;
    var updateDto = new UpdateTeamDto
    {
      Name = existingTeam.Name,
      Purpose = "NewPurpose",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTeam.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateTeam_ForNonExistentTeam_ReturnsNotFound()
  {
    // Arrange
    var existingTeam = _seedData.Team;
    var updateDto = new UpdateTeamDto
    {
      Name = existingTeam.Name,
      Purpose = "NewPurpose",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTeam()
  {
    // Arrange
    var team = _seedData.Team;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{team.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class TeamsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Team Team = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TeamTests class.
    // The DB is not re-initialized between tests.
    Team = db.Teams.Add(new Team
    {
      Name = "Team Name",
      Purpose = "Team Purpose",
    }).Entity;

    db.SaveChanges(true);
  }
}