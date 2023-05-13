using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class HomeAssignmentTests
    : TestsBase<HomeAssignmentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/homeassignments";

  public HomeAssignmentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateHomeAssignment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newHomeAssignment = new CreateHomeAssignmentDto
    {
      CapabilityId = _seedData.Capability.Id,
      TeamId = _seedData.Team.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newHomeAssignment, _options)
      .ContinueWith<HomeAssignmentDto?>(t => t.Result.Content.ReadFromJsonAsync<HomeAssignmentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newHomeAssignment.CapabilityId, assignment.CapabilityId);
    Assert.Equal(newHomeAssignment.TeamId, assignment.TeamId);
  }

  [Fact]
  public async Task TestGetAllHomeAssignments()
  {
    // Arrange
    var existingHomeAssignment = _seedData.HomeAssignment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<HomeAssignment>>($"{_path}", _options);

    // Assert
    Assert.Contains(assignments!, t => t.Id == existingHomeAssignment.Id);
  }

  [Fact]
  public async Task TestGetHomeAssignment()
  {
    // Arrange
    var existingHomeAssignment = _seedData.HomeAssignment;

    // Act
    var assignment = await _client.GetFromJsonAsync<HomeAssignmentDto>($"{_path}/{existingHomeAssignment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingHomeAssignment.Id);
  }

  [Fact]
  public async Task TestUpdateHomeAssignment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingHomeAssignment = _seedData.HomeAssignment;
    var updateDto = new UpdateHomeAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingHomeAssignment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateHomeAssignment_ForNonExistentHomeAssignment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateHomeAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteHomeAssignment()
  {
    // Arrange
    var role = _seedData.HomeAssignment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class HomeAssignmentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public CapabilityType CapabilityType { get; set; } = null!;
  public Capability Capability { get; set; } = null!;
  public RoleType RoleType { get; set; } = null!;
  public Role Role { get; set; } = null!;
  public HomeAssignment HomeAssignment { get; set; } = null!;
  public Team Team { get; set; } = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the HomeAssignmentTests class.
    // The DB is not re-initialized between tests.

    Team = db.Teams.Add(new Team
    {
      Type = "home",
      Name = "Seed Team",
    }).Entity;
    db.SaveChanges(true);

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

    CapabilityType = db.CapabilityTypes.Add(new CapabilityType
    {
      Name = "Seed Capability Type",
    }).Entity;
    db.SaveChanges(true);

    Capability = db.Capabilities.Add(new Capability
    {
      CapabilityTypeId = CapabilityType.Id,
      RoleId = Role.Id,
    }).Entity;
    db.SaveChanges(true);

    HomeAssignment = db.HomeAssignments.Add(new HomeAssignment
    {
      CapabilityId = Capability.Id,
      TeamId = Team.Id,
    }).Entity;
    db.SaveChanges(true);
  }
}
