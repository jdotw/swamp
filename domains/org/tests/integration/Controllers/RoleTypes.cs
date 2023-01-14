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

public class RoleTypeTests
    : TestsBase<RoleTypesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/roletypes";

  public RoleTypeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateRoleType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newRoleType = new CreateRoleTypeDto
    {
      Title = "Test RoleType",
    };

    // Act
    var roletype = await _client.PostAsJsonAsync(_path, newRoleType, _options)
      .ContinueWith<RoleTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<RoleTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, roletype!.Id);
    Assert.Equal(newRoleType.Title, roletype.Title);
  }

  [Fact]
  public async Task TestGetAllRoleTypes()
  {
    // Arrange
    var existingRoleType = _seedData.RoleType;

    // Act
    var roletypes = await _client.GetFromJsonAsync<List<RoleType>>($"{_path}", _options);

    // Assert
    Assert.Contains(roletypes!, t => t.Id == existingRoleType.Id);
  }

  [Fact]
  public async Task TestGetRoleType()
  {
    // Arrange
    var existingRoleType = _seedData.RoleType;

    // Act
    var roletype = await _client.GetFromJsonAsync<RoleTypeDto>($"{_path}/{existingRoleType.Id}", _options);

    // Assert
    Assert.Equal(roletype!.Id, existingRoleType.Id);
    Assert.Equal(roletype.Title, existingRoleType.Title);
  }

  [Fact]
  public async Task TestUpdateRoleType_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingRoleType = _seedData.RoleType;
    var updateDto = new UpdateRoleTypeDto
    {
      Title = "NewTitle",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingRoleType.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateRoleType_ForNonExistentRoleType_ReturnsNotFound()
  {
    // Arrange
    var existingRoleType = _seedData.RoleType;
    var updateDto = new UpdateRoleTypeDto
    {
      Title = "NewTitle",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteRoleType()
  {
    // Arrange
    var roletype = _seedData.RoleType;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{roletype.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class RoleTypesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public RoleType RoleType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the RoleTypeTests class.
    // The DB is not re-initialized between tests.
    RoleType = db.RoleTypes.Add(new RoleType
    {
      Title = "Test RoleType"
    }).Entity;

    db.SaveChanges(true);
  }
}