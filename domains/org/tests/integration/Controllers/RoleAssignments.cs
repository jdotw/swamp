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

public class RoleAssignmentTests
    : TestsBase<RoleAssignmentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  public RoleAssignmentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  private string _path => $"/persons/{_seedData.Person.Id}/role_assignments";

  [Fact]
  public async Task TestCreateRoleAssignment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newRoleAssignment = new CreateRoleAssignmentDto
    {
      PersonId = _seedData.Person.Id,
      RoleId = _seedData.Role.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newRoleAssignment, _options)
      .ContinueWith<RoleAssignmentDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleAssignmentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newRoleAssignment.RoleId, assignment.RoleId);
    Assert.Equal(newRoleAssignment.PersonId, assignment.PersonId);
  }

  [Fact]
  public async Task TestGetAllRoleAssignments_ForSpecificPerson()
  {
    // Arrange
    var existingRoleAssignment = _seedData.RoleAssignment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<RoleAssignment>>($"{_path}", _options);

    // Assert
    assignments.Should().ContainSingle(t => t.Id == existingRoleAssignment.Id);
    assignments.Should().NotContain(t => t.Id == _seedData.OtherPersonsRoleAssignment.Id);
  }

  [Fact]
  public async Task TestGetRoleAssignment()
  {
    // Arrange
    var existingRoleAssignment = _seedData.RoleAssignment;

    // Act
    var assignment = await _client.GetFromJsonAsync<RoleAssignmentDto>($"{_path}/{existingRoleAssignment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingRoleAssignment.Id);
    Assert.Equal(assignment.RoleId, existingRoleAssignment.RoleId);
    Assert.Equal(assignment.PersonId, existingRoleAssignment.PersonId);
  }

  [Fact]
  public async Task TestUpdateRoleAssignment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingRoleAssignment = _seedData.RoleAssignment;
    var updateDto = new UpdateRoleAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingRoleAssignment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateRoleAssignment_ForNonExistentRoleAssignment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateRoleAssignmentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteRoleAssignment()
  {
    // Arrange
    var assignment = _seedData.RoleAssignment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{assignment.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class RoleAssignmentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public RoleType RoleType = null!;
  public Level Level = null!;
  public Role Role = null!;
  public Person Person = null!;
  public RoleAssignment RoleAssignment = null!;
  public Role OtherPersonsRole = null!;
  public Person OtherPerson = null!;
  public RoleAssignment OtherPersonsRoleAssignment = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the RoleAssignmentTests class.
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

    Person = db.Persons.Add(new Person
    {
      ExternalId = "12334",
      FirstName = "Seed",
      LastName = "Person",
    }).Entity;
    db.SaveChanges(true);

    RoleAssignment = db.RoleAssignments.Add(new RoleAssignment
    {
      PersonId = Person.Id,
      RoleId = Role.Id,
    }).Entity;
    db.SaveChanges(true);

    OtherPersonsRole = db.Roles.Add(new Role
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

    OtherPerson = db.Persons.Add(new Person
    {
      ExternalId = "57564",
      FirstName = "Other",
      LastName = "Person",
    }).Entity;
    db.SaveChanges(true);

    OtherPersonsRoleAssignment = db.RoleAssignments.Add(new RoleAssignment
    {
      PersonId = OtherPerson.Id,
      RoleId = OtherPersonsRole.Id,
    }).Entity;
    db.SaveChanges(true);

  }
}