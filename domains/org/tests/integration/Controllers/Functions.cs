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

public class FunctionTests
    : TestsBase<FunctionsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  public FunctionTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  protected string Path(int roleId) => $"/roles/{roleId}/functions";
  protected string Path(int roleId, int functionId) => $"/roles/{roleId}/functions/{functionId}";

  [Fact]
  public async Task TestCreateFunction_WithFunctionType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var roleId = _seedData.Role.Id;
    var newFunction = new CreateFunctionDto
    {
      FunctionTypeId = 1,
      TribeId = 1,
    };

    // Act
    var function = await _client.PostAsJsonAsync(Path(roleId), newFunction, _options)
      .ContinueWith<FunctionDto?>(t => t.Result.Content.ReadFromJsonAsync<FunctionDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, function!.Id);
    Assert.Equal(roleId, function.RoleId);
    Assert.Equal(newFunction.FunctionTypeId, function.FunctionTypeId);
    Assert.Equal(newFunction.TribeId, function.TribeId);
  }

  [Fact]
  public async Task TestCreateFunction_WithOutFunctionType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var roleId = _seedData.Role.Id;
    var newFunction = new CreateFunctionDto
    {
      Name = "Super Spesh Snowflake",
      TribeId = 1,
    };

    // Act
    Console.WriteLine("Path: " + Path(roleId));
    var function = await _client.PostAsJsonAsync(Path(roleId), newFunction, _options)
      .ContinueWith<FunctionDto?>(t => t.Result.Content.ReadFromJsonAsync<FunctionDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, function!.Id);
    Assert.Equal(roleId, function.RoleId);
    Assert.Equal(newFunction.Name, function.Name);
    Assert.Equal(newFunction.TribeId, function.TribeId);
  }


  [Fact]
  public async Task TestGetAllFunctions()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var existingFunctionWithFunctionType = _seedData.FunctionWithFunctionType;
    var existingFunctionWithoutFunctionType = _seedData.FunctionWithoutFunctionType;

    // Act
    var functions = await _client.GetFromJsonAsync<List<Function>>($"{Path(roleId)}", _options);

    // Assert
    Assert.Contains(functions!, t => t.Id == existingFunctionWithFunctionType.Id);
    Assert.Contains(functions!, t => t.Id == existingFunctionWithoutFunctionType.Id);
  }

  [Fact]
  public async Task TestGetFunction_WithFunctionType()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var existingFunction = _seedData.FunctionWithFunctionType;

    // Act
    var function = await _client.GetFromJsonAsync<FunctionDto>(Path(roleId, existingFunction.Id), _options);

    // Assert
    Assert.Equal(function!.Id, existingFunction.Id);
    Assert.Equal(function.TribeId, existingFunction.TribeId);
    Assert.Equal(function.FunctionTypeId, existingFunction.FunctionTypeId);
  }

  [Fact]
  public async Task TestGetFunction_WithoutFunctionType()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var existingFunction = _seedData.FunctionWithoutFunctionType;

    // Act
    var function = await _client.GetFromJsonAsync<FunctionDto>(Path(roleId, existingFunction.Id), _options);

    // Assert
    Assert.Equal(function!.Id, existingFunction.Id);
    Assert.Equal(function.TribeId, existingFunction.TribeId);
    Assert.Null(function.FunctionType);
    Assert.Equal(function.Name, existingFunction.Name);
  }

  [Fact]
  public async Task TestGetFunction_NotFound()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var nonExistentFunctionId = 52342;

    // Act
    var result = await _client.GetAsync(Path(roleId, nonExistentFunctionId));

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, result.StatusCode);
  }

  [Fact]
  public async Task TestUpdateFunction_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var existingFunction = _seedData.FunctionWithFunctionType;
    var updateDto = new UpdateFunctionDto
    {
      FunctionTypeId = existingFunction.FunctionTypeId,
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(roleId, existingFunction.Id), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateFunction_ForNonExistentFunction_ReturnsNotFound()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var nonExistentFunctionId = 52342;
    var updateDto = new UpdateFunctionDto
    {
      FunctionTypeId = 5,
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(roleId, nonExistentFunctionId), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteFunction()
  {
    // Arrange
    var roleId = _seedData.Role.Id;
    var function = _seedData.FunctionWithFunctionType;

    // Act
    var response = await _client.DeleteAsync(Path(roleId, function.Id));

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class FunctionsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Person Person = null!;
  public Role Role = null!;
  public Tribe Tribe = null!;
  public FunctionType FunctionType = null!;
  public Function FunctionWithFunctionType = null!;
  public Function FunctionWithoutFunctionType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the FunctionTests class.
    // The DB is not re-initialized between tests.

    Person = db.Persons.Add(new Person
    {
      ExternalId = "SDNK132132131",
      FirstName = "Seed",
      MiddleNames = "Lucky",
      LastName = "Person",
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      Title = "Seed Role",
      Person = Person,
    }).Entity;

    Tribe = db.Tribes.Add(new Tribe
    {
      Name = "Seed Tribe",
    }).Entity;

    FunctionType = db.FunctionTypes.Add(new FunctionType
    {
      Name = "Seed Function Type",
    }).Entity;
    db.SaveChanges(true);

    FunctionWithFunctionType = db.Functions.Add(new Function
    {
      Tribe = Tribe,
      FunctionType = FunctionType,
      Role = Role,
    }).Entity;
    db.SaveChanges(true);

    FunctionWithoutFunctionType = db.Functions.Add(new Function
    {
      Tribe = Tribe,
      Name = "Custom Function Name",
      Role = Role,
    }).Entity;
    db.SaveChanges(true);
  }
}