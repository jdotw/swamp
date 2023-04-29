using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class ManagerAssignmentTests
    : TestsBase<ManagerAssignmentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/managerassignments";

  public ManagerAssignmentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateManagerAssignment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newManagerAssignment = new CreateManagerAssignmentDto
    {
      ManagerId = _seedData.Manager.Id,
      RoleId = _seedData.Role.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newManagerAssignment, _options)
      .ContinueWith<ManagerAssignmentDto?>(t => t.Result.Content.ReadFromJsonAsync<ManagerAssignmentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newManagerAssignment.ManagerId, assignment.ManagerId);
    Assert.Equal(newManagerAssignment.RoleId, assignment.RoleId);
  }

  [Fact]
  public async Task TestGetAllManagerAssignments()
  {
    // Arrange
    var existingManagerAssignment = _seedData.ManagerAssignment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<ManagerAssignment>>($"{_path}", _options);

    // Assert
    Assert.Contains(assignments!, t => t.Id == existingManagerAssignment.Id);
  }

  [Fact]
  public async Task TestGetManagerAssignment()
  {
    // Arrange
    var existingManagerAssignment = _seedData.ManagerAssignment;

    // Act
    var assignment = await _client.GetFromJsonAsync<ManagerAssignmentDto>($"{_path}/{existingManagerAssignment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingManagerAssignment.Id);
  }

  [Fact]
  public async Task TestUpdateManagerAssignment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingManagerAssignment = _seedData.ManagerAssignment;
    var updateDto = new UpdateManagerAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingManagerAssignment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateManagerAssignment_ForNonExistentManagerAssignment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateManagerAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteManagerAssignment()
  {
    // Arrange
    var role = _seedData.ManagerAssignment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class ManagerAssignmentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public RoleType RoleType { get; set; } = null!;
  public Role Role { get; set; } = null!;
  public RoleType ManagerType { get; set; } = null!;
  public Role Manager { get; set; } = null!;
  public ManagerAssignment ManagerAssignment { get; set; } = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the ManagerAssignmentTests class.
    // The DB is not re-initialized between tests.

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Name = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      RoleTypeId = RoleType.Id,
    }).Entity;
    db.SaveChanges(true);

    ManagerType = db.RoleTypes.Add(new RoleType
    {
      Name = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    Manager = db.Roles.Add(new Role
    {
      RoleTypeId = ManagerType.Id,
    }).Entity;
    db.SaveChanges(true);

    ManagerAssignment = db.ManagerAssignments.Add(new ManagerAssignment
    {
      RoleId = Role.Id,
      ManagerId = Manager.Id,
    }).Entity;
    db.SaveChanges(true);
  }
}
