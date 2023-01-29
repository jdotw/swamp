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
      RoleTypeId = _seedData.RoleType.Id,
      LevelId = _seedData.Level.Id,
      UnitType = "team",
      UnitId = _seedData.Team.Id,
      FunctionTypeId = _seedData.FunctionType.Id
    };

    // Act
    var role = await _client.PostAsJsonAsync(_path, newRole, _options)
      .ContinueWith<RoleDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, role!.Id);
    Assert.Equal(newRole.RoleTypeId, role.RoleTypeId);
    Assert.NotEmpty(role.LevelAssignments);
    Assert.Equal(newRole.LevelId, role.LevelAssignments[0].LevelId);
    Assert.Equal(role.Id, role.LevelAssignments[0].RoleId);
  }

  [Fact]
  public async Task TestGetAllRoles()
  {
    // Arrange
    var existingRole = _seedData.Role;

    // Act
    var roles = await _client.GetFromJsonAsync<List<RoleDto>>($"{_path}", _options);

    // Assert
    Assert.Contains(roles!, t => t.Id == existingRole.Id);
    Assert.Contains(roles!, t => t.RoleType!.Id == existingRole.RoleTypeId);
    var expectedRole = roles!.First(t => t.Id == existingRole.Id);
    Assert.NotEmpty(expectedRole.LevelAssignments);
    //    Assert.NotEmpty(expectedRole.UnitAssignments);
    Assert.NotNull(expectedRole.CapabilityUnitAssignment);
    Assert.NotNull(expectedRole.DeliveryUnitAssignment);
    var delivery = expectedRole.CapabilityUnitAssignment;
    Console.WriteLine($"delivery: {delivery}");
    // (expectedRole.CapabilityUnitAssignment as ChapterAssignmentDto)!.ChapterId.Should().Be(_seedData.Chapter.Id);
    (expectedRole.DeliveryUnitAssignment as TeamAssignmentDto)!.TeamId.Should().Be(_seedData.Team.Id);
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
    Assert.Equal(role.RoleTypeId, existingRole.RoleTypeId);
    Assert.NotEmpty(role.LevelAssignments);
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
}

public class RolesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Level Level = null!;
  public RoleType RoleType = null!;
  public Role Role = null!;
  public Team Team = null!;
  public Practice Practice = null!;
  public Chapter Chapter = null!;
  public FunctionType FunctionType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the RoleTests class.
    // The DB is not re-initialized between tests.

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Title = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    FunctionType = db.FunctionTypes.Add(new FunctionType
    {
      Name = "Seed Function Type",
    }).Entity;
    db.SaveChanges(true);

    Level = db.Levels.Add(new Level
    {
      IndividualContributorTitle = "Individual Contributor",
      ManagerTitle = "Manager",
    }).Entity;
    db.SaveChanges(true);

    Team = db.Teams.Add(new Team
    {
      Name = "Seed Team",
    }).Entity;
    db.SaveChanges(true);

    Practice = db.Practices.Add(new Practice
    {
      Name = "Seed Practice",
    }).Entity;
    db.SaveChanges(true);

    Chapter = db.Chapters.Add(new Chapter
    {
      Name = "Seed Chapter",
      PracticeId = Practice.Id,
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      RoleTypeId = RoleType.Id,
      LevelAssignments = new List<LevelAssignment>
      {
        new LevelAssignment
        {
          LevelId = Level.Id,
        }
      },
      UnitAssignments = new List<UnitAssignment>
      {
        new TeamAssignment
        {
          TeamId = Team.Id,
          FunctionTypeId = FunctionType.Id,
        },
        new ChapterAssignment
        {
          ChapterId = Chapter.Id,
          FunctionTypeId = FunctionType.Id,
        }
      }
    }).Entity;
    db.SaveChanges(true);
  }
}