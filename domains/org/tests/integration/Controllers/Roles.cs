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
  public async Task TestCreateRole_WithRoleType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newRole = new CreateRoleDto
    {
      PersonId = 1,
      RoleTypeId = 1,
    };

    // Act
    var role = await _client.PostAsJsonAsync(_path, newRole, _options)
      .ContinueWith<RoleDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, role!.Id);
    Assert.Equal(newRole.PersonId, role.PersonId);
    Assert.Equal(newRole.RoleTypeId, role.RoleTypeId);
  }

  [Fact]
  public async Task TestCreateRole_WithOutRoleType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newRole = new CreateRoleDto
    {
      PersonId = 1,
      Title = "Super Spesh Snowflake"
    };

    // Act
    var role = await _client.PostAsJsonAsync(_path, newRole, _options)
      .ContinueWith<RoleDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, role!.Id);
    Assert.Equal(newRole.PersonId, role.PersonId);
    Assert.Equal(newRole.Title, role.Title);
  }


  [Fact]
  public async Task TestGetAllRoles()
  {
    // Arrange
    var existingRoleWithRoleType = _seedData.RoleWithRoleType;
    var existingRoleWithoutRoleType = _seedData.RoleWithoutRoleType;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Role>>($"{_path}", _options);

    // Assert
    Assert.Contains(roles!, t => t.Id == existingRoleWithRoleType.Id);
    Assert.Contains(roles!, t => t.Id == existingRoleWithoutRoleType.Id);
  }

  [Fact]
  public async Task TestGetRole_WithRoleType()
  {
    // Arrange
    var existingRole = _seedData.RoleWithRoleType;

    // Act
    var role = await _client.GetFromJsonAsync<RoleDto>($"{_path}/{existingRole.Id}", _options);

    // Assert
    Assert.Equal(role!.Id, existingRole.Id);
    Assert.Equal(role.PersonId, existingRole.PersonId);
    Assert.Equal(role.RoleTypeId, existingRole.RoleTypeId);
  }

  [Fact]
  public async Task TestGetRole_WithoutRoleType()
  {
    // Arrange
    var existingRole = _seedData.RoleWithoutRoleType;

    // Act
    var role = await _client.GetFromJsonAsync<RoleDto>($"{_path}/{existingRole.Id}", _options);

    // Assert
    Assert.Equal(role!.Id, existingRole.Id);
    Assert.Equal(role.PersonId, existingRole.PersonId);
    Assert.Null(role.RoleType);
    Assert.Equal(role.Title, existingRole.Title);
  }


  [Fact]
  public async Task TestUpdateRole_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingRole = _seedData.RoleWithRoleType;
    var updateDto = new UpdateRoleDto
    {
      RoleTypeId = existingRole.RoleTypeId,
      IsActive = false,
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
    var existingRole = _seedData.RoleWithRoleType;
    var updateDto = new UpdateRoleDto
    {
      RoleTypeId = existingRole.RoleTypeId,
      IsActive = false,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteRole()
  {
    // Arrange
    var role = _seedData.RoleWithRoleType;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class RolesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Person Person = null!;
  public RoleType RoleType = null!;
  public Role RoleWithRoleType = null!;
  public Role RoleWithoutRoleType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the RoleTests class.
    // The DB is not re-initialized between tests.

    Person = db.Persons.Add(new Person
    {
      ExternalId = "SDNK132132131",
      FirstName = "Seed",
      MiddleNames = "Lucky",
      LastName = "Person",
    }).Entity;
    db.SaveChanges(true);

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Title = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    RoleWithRoleType = db.Roles.Add(new Role
    {
      PersonId = Person.Id,
      RoleTypeId = RoleType.Id,
    }).Entity;
    db.SaveChanges(true);

    RoleWithoutRoleType = db.Roles.Add(new Role
    {
      PersonId = Person.Id,
      Title = "Custom Role Title"
    }).Entity;
    db.SaveChanges(true);
  }
}