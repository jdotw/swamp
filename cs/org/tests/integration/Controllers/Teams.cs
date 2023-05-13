using System.Net;
using Org.DTOs;
using Org.Entities;
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
      Type = "delivery",
    };

    // Act
    var team = await _client.PostAsJsonAsync(_path, newTeam, _options)
      .ContinueWith<TeamDto?>(t => t.Result.Content.ReadFromJsonAsync<TeamDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, team!.Id);
  }

  [Fact]
  public async Task TestCreateTeamWithParent()
  {
    // Arrange
    var existingTeam = _seedData.ParentTeam;
    var testStart = DateTime.UtcNow;
    var newTeam = new CreateTeamDto
    {
      Name = "Test Child Team",
      ParentId = existingTeam.Id,
      Type = "delivery",
    };

    // Act
    var team = await _client.PostAsJsonAsync(_path, newTeam, _options)
      .ContinueWith<TeamDto?>(t => t.Result.Content.ReadFromJsonAsync<TeamDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, team!.Id);
    Assert.Equal(existingTeam.Id, team.ParentId);
  }

  [Fact]
  public async Task TestGetAllTeams()
  {
    // Arrange
    var existingTeam = _seedData.ParentTeam;

    // Act
    var teams = await _client.GetFromJsonAsync<List<Team>>($"{_path}", _options);

    // Assert
    // Returns flat list, so all teams will be present
    Assert.Contains(teams!, t => t.Id == existingTeam.Id);
    Assert.Contains(teams!, t => t.Id == _seedData.ChildTeam.Id);
    Assert.Contains(teams!, t => t.Id == _seedData.GrandChildTeam.Id);
  }

  [Fact]
  public async Task TestGetTeamWithoutChildren()
  {
    // Arrange
    var existingTeam = _seedData.TeamWithoutChildren;

    // Act
    var team = await _client.GetFromJsonAsync<TeamDto>($"{_path}/{existingTeam.Id}", _options);

    // Assert
    Assert.Equal(team!.Id, existingTeam.Id);
    Assert.Empty(team.Children);
  }

  [Fact]
  public async Task TestGetTeamWithChildren()
  {
    // Arrange
    var existingTeam = _seedData.ParentTeam;

    // Act
    var team = await _client.GetFromJsonAsync<TeamDto>($"{_path}/{existingTeam.Id}", _options);

    // Assert
    Console.WriteLine("Children: " + team!.Children.Count);
    Assert.Equal(team!.Id, existingTeam.Id);
    Assert.Contains(team.Children, t => t.Id == _seedData.ChildTeam.Id);
  }

  [Fact]
  public async Task TestGetChildTeam()
  {
    // Arrange
    var existingTeam = _seedData.ChildTeam;

    // Act
    var team = await _client.GetFromJsonAsync<TeamDto>($"{_path}/{existingTeam.Id}", _options);

    // Assert
    Assert.Equal(team!.Id, existingTeam.Id);
    Assert.Contains(team.Children, t => t.Id == _seedData.GrandChildTeam.Id);
  }

  [Fact]
  public async Task TestUpdateTeam_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTeam = _seedData.ParentTeam;
    var updateDto = new UpdateTeamDto
    {
      Name = existingTeam.Name,
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
    var existingTeam = _seedData.ParentTeam;
    var updateDto = new UpdateTeamDto
    {
      Name = existingTeam.Name,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTeamWithoutChildren()
  {
    // Arrange
    var team = _seedData.TeamWithoutChildren;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{team.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTeamWithChildren()
  {
    // Arrange
    var team = _seedData.ParentTeam;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{team.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
  }
}

public class TeamsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Team ParentTeam = null!;
  public Team ChildTeam = null!;
  public Team GrandChildTeam = null!;
  public Team TeamWithoutChildren = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TeamTests class.
    // The DB is not re-initialized between tests.
    ParentTeam = db.Teams.Add(new Team
    {
      Name = "Team Name",
      Type = "delivery",
    }).Entity;
    db.SaveChanges(true);
    ChildTeam = db.Teams.Add(new Team
    {
      Name = "Child Team",
      Parent = ParentTeam,
      Type = "delivery",
    }).Entity;
    db.SaveChanges(true);
    GrandChildTeam = db.Teams.Add(new Team
    {
      Name = "Grand Child Team",
      Parent = ChildTeam,
      Type = "delivery",
    }).Entity;
    db.SaveChanges(true);
    TeamWithoutChildren = db.Teams.Add(new Team
    {
      Name = "Team Without Children",
      Type = "delivery",
    }).Entity;
    db.SaveChanges(true);
  }
}
