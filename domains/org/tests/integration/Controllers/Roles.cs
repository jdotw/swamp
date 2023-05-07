using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class RoleTests
    : TestsBase<RolesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/roles";

  public RoleTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateRole()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newRole = new CreateRoleDto
    {
      TitleId = _seedData.Title.Id,
      RoleTypeId = _seedData.RoleType.Id,
    };

    // Act
    var role = await _client.PostAsJsonAsync(_path, newRole, _options)
      .ContinueWith<RoleDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, role!.Id);
    Assert.Equal(newRole.RoleTypeId, role.RoleType.Id);
    Assert.NotEmpty(role.TitleAssignments);
    Assert.Equal(newRole.TitleId, role.TitleAssignments[0].TitleId);
    Assert.Equal(role.Id, role.TitleAssignments[0].RoleId);
  }

  [Fact]
  public async Task TestGetAllRoles()
  {
    // Arrange
    var existingRole = _seedData.Role;

    // Act
    var roles = await _client.GetFromJsonAsync<List<RoleCollectionDto>>($"{_path}", _options);

    // Assert
    Assert.Contains(roles!, t => t.Id == existingRole.Id);
    Assert.Contains(roles!, t => t.RoleType!.Id == existingRole.RoleTypeId);
    var expectedRole = roles!.First(t => t.Id == existingRole.Id);
  }

  [Fact]
  public async Task TestGetRole()
  {
    // Arrange
    var existingRole = _seedData.Role;

    // Act
    var role = await _client.GetFromJsonAsync<RoleDto>($"{_path}/{existingRole.Id}", _options);

    // Assert
    Assert.Equal(role!.Id, existingRole.Id);
    Assert.Equal(role.RoleType.Id, existingRole.RoleType!.Id);
    Assert.NotEmpty(role.TitleAssignments);
  }

  [Fact]
  public async Task TestUpdateRole_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingRole = _seedData.Role;
    var updateDto = new UpdateRoleDto
    {
      ClosedAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingRole.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateRole_ForNonExistentRole_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateRoleDto
    {
      ClosedAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteRole()
  {
    // Arrange
    var role = _seedData.Role;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestGetRoleCapabilities()
  {
    // Arrange
    var existingRole = _seedData.Role;
    var existingCapability = _seedData.Capability;

    // Act
    var capabilities = await _client.GetFromJsonAsync<List<CapabilityCollectionDto>>($"{_path}/{existingRole.Id}/capabilities", _options);

    // Assert
    Assert.Contains(capabilities!, t => t.Id == existingCapability.Id);
  }
}

public class RolesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Level Level = null!;
  public RoleType RoleType = null!;
  public Role Role = null!;
  public Team Team = null!;
  public Title Title = null!;
  public Capability Capability = null!;
  public CapabilityType CapabilityType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the RoleTests class.
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

    Team = db.Teams.Add(new Team
    {
      Name = "Seed Team",
      Type = "home",
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      RoleTypeId = RoleType.Id,
      TitleAssignments = new List<TitleAssignment>
      {
        new TitleAssignment
        {
          TitleId = Title.Id,
        }
      },
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
  }
}
