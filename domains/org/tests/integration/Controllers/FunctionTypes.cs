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

public class FunctionTypeTests
    : TestsBase<FunctionTypesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/functiontypes";

  public FunctionTypeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  private async Task TestCreateFunctionType(string name, bool isIndividualContributor)
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newFunctionType = new CreateFunctionTypeDto
    {
      Name = name,
      IsIndividualContributor = isIndividualContributor,
    };

    // Act
    var functiontype = await _client.PostAsJsonAsync(_path, newFunctionType, _options)
      .ContinueWith<FunctionTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<FunctionTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, functiontype!.Id);
    Assert.Equal(newFunctionType.Name, functiontype.Name);
    Assert.Equal(newFunctionType.IsIndividualContributor, functiontype.IsIndividualContributor);
  }

  [Fact]
  public Task TestCreateFunctionType_IC() => TestCreateFunctionType("IC", true);

  [Fact]
  public Task TestCreateFunctionType_Manager() => TestCreateFunctionType("Manager", false);

  [Fact]
  public async Task TestGetAllFunctionTypes()
  {
    // Arrange
    var existingFunctionType = _seedData.FunctionType;

    // Act
    var functiontypes = await _client.GetFromJsonAsync<List<FunctionType>>($"{_path}", _options);

    // Assert
    Assert.Contains(functiontypes!, t => t.Id == existingFunctionType.Id);
  }

  [Fact]
  public async Task TestGetFunctionType()
  {
    // Arrange
    var existingFunctionType = _seedData.FunctionType;

    // Act
    var functiontype = await _client.GetFromJsonAsync<FunctionTypeDto>($"{_path}/{existingFunctionType.Id}", _options);

    // Assert
    Assert.Equal(functiontype!.Id, existingFunctionType.Id);
    Assert.Equal(functiontype.Name, existingFunctionType.Name);
  }

  [Fact]
  public async Task TestUpdateFunctionType_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingFunctionType = _seedData.FunctionType;
    var updateDto = new UpdateFunctionTypeDto
    {
      Name = "NewName",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingFunctionType.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateFunctionType_ForNonExistentFunctionType_ReturnsNotFound()
  {
    // Arrange
    var existingFunctionType = _seedData.FunctionType;
    var updateDto = new UpdateFunctionTypeDto
    {
      Name = "NewName",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteFunctionType()
  {
    // Arrange
    var functiontype = _seedData.FunctionType;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{functiontype.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class FunctionTypesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public FunctionType FunctionType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the FunctionTypeTests class.
    // The DB is not re-initialized between tests.
    FunctionType = db.FunctionTypes.Add(new FunctionType
    {
      Name = "Test FunctionType"
    }).Entity;

    db.SaveChanges(true);
  }
}