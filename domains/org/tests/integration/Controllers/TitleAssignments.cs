using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class TitleAssignmentTests
    : TestsBase<TitleAssignmentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/titleassignments";

  public TitleAssignmentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateTitleAssignment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTitleAssignment = new CreateTitleAssignmentDto
    {
      RoleId = _seedData.Role.Id,
      TitleId = _seedData.Title.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newTitleAssignment, _options)
      .ContinueWith<TitleAssignmentDto?>(t => t.Result.Content.ReadFromJsonAsync<TitleAssignmentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newTitleAssignment.RoleId, assignment.RoleId);
    Assert.Equal(newTitleAssignment.TitleId, assignment.TitleId);
  }

  [Fact]
  public async Task TestGetAllTitleAssignments()
  {
    // Arrange
    var existingTitleAssignment = _seedData.TitleAssignment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<TitleAssignment>>($"{_path}", _options);

    // Assert
    Assert.Contains(assignments!, t => t.Id == existingTitleAssignment.Id);
  }

  [Fact]
  public async Task TestGetTitleAssignment()
  {
    // Arrange
    var existingTitleAssignment = _seedData.TitleAssignment;

    // Act
    var assignment = await _client.GetFromJsonAsync<TitleAssignmentDto>($"{_path}/{existingTitleAssignment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingTitleAssignment.Id);
  }

  [Fact]
  public async Task TestUpdateTitleAssignment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTitleAssignment = _seedData.TitleAssignment;
    var updateDto = new UpdateTitleAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTitleAssignment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateTitleAssignment_ForNonExistentTitleAssignment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateTitleAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTitleAssignment()
  {
    // Arrange
    var role = _seedData.TitleAssignment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class TitleAssignmentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Title Title = null!;
  public RoleType RoleType = null!;
  public Role Role = null!;
  public Level Level = null!;
  public TitleAssignment TitleAssignment = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TitleAssignmentTests class.
    // The DB is not re-initialized between tests.

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Name = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    Level = db.Levels.Add(new Level
    {
      Name = "Seed Level",
    }).Entity;
    db.SaveChanges(true);

    Title = db.Titles.Add(new Title
    {
      Name = "Seed Title",
      LevelId = Level.Id,
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      TitleAssignments = new List<TitleAssignment>
      {
        new TitleAssignment
        {
          TitleId = Title.Id,
        }
      },
      RoleTypeId = RoleType.Id,
    }).Entity;
    db.SaveChanges(true);
    TitleAssignment = Role.TitleAssignments.First();
  }
}
