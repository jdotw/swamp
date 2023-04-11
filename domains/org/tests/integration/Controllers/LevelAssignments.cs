using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class LevelAssignmentTests
    : TestsBase<LevelAssignmentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/levelassignments";

  public LevelAssignmentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateLevelAssignment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newLevelAssignment = new CreateLevelAssignmentDto
    {
      RoleId = _seedData.Role.Id,
      LevelId = _seedData.Level.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newLevelAssignment, _options)
      .ContinueWith<LevelAssignmentDto?>(t => t.Result.Content.ReadFromJsonAsync<LevelAssignmentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newLevelAssignment.RoleId, assignment.RoleId);
    Assert.Equal(newLevelAssignment.LevelId, assignment.LevelId);
  }

  [Fact]
  public async Task TestGetAllLevelAssignments()
  {
    // Arrange
    var existingLevelAssignment = _seedData.LevelAssignment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<LevelAssignment>>($"{_path}", _options);

    // Assert
    Assert.Contains(assignments!, t => t.Id == existingLevelAssignment.Id);
  }

  [Fact]
  public async Task TestGetLevelAssignment()
  {
    // Arrange
    var existingLevelAssignment = _seedData.LevelAssignment;

    // Act
    var assignment = await _client.GetFromJsonAsync<LevelAssignmentDto>($"{_path}/{existingLevelAssignment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingLevelAssignment.Id);
  }

  [Fact]
  public async Task TestUpdateLevelAssignment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingLevelAssignment = _seedData.LevelAssignment;
    var updateDto = new UpdateLevelAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingLevelAssignment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateLevelAssignment_ForNonExistentLevelAssignment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateLevelAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteLevelAssignment()
  {
    // Arrange
    var role = _seedData.LevelAssignment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class LevelAssignmentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Level Level = null!;
  public RoleType RoleType = null!;
  public Role Role = null!;
  public LevelAssignment LevelAssignment = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the LevelAssignmentTests class.
    // The DB is not re-initialized between tests.

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Title = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    Level = db.Levels.Add(new Level
    {
      IndividualContributorTitle = "Seed IC",
      ManagerTitle = "Seed Manager"
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      LevelAssignments = new List<LevelAssignment>
      {
        new LevelAssignment
        {
          LevelId = Level.Id,
        }
      },
      RoleTypeId = RoleType.Id,
    }).Entity;
    db.SaveChanges(true);
    LevelAssignment = Role.LevelAssignments.First();
  }
}
