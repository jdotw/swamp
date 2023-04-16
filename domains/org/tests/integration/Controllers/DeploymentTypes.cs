
using System.Net;
using Org.DTOs;
using Org.Entities;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class DeploymentTypeTests
    : TestsBase<DeploymentTypesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/deploymenttypes";

  public DeploymentTypeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateDeploymentType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newDeploymentType = new CreateDeploymentTypeDto
    {
      Name = "Test"
    };

    // Act
    var deploymentType = await _client.PostAsJsonAsync(_path, newDeploymentType, _options)
      .ContinueWith<DeploymentTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<DeploymentTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, deploymentType!.Id);
    Assert.Equal(newDeploymentType.Name, deploymentType.Name);
    deploymentType.ActiveFromDate.Should().BeOnOrAfter(testStart);
    deploymentType.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestCreateChildDeploymentType()
  {
    // Arrange
    var parentDeploymentType = _seedData.DeploymentType;
    var testStart = DateTime.UtcNow;
    var newDeploymentType = new CreateDeploymentTypeDto
    {
      Name = "Test Child",
      ParentId = parentDeploymentType.Id
    };

    // Act
    var deploymentType = await _client.PostAsJsonAsync(_path, newDeploymentType, _options)
      .ContinueWith<DeploymentTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<DeploymentTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, deploymentType!.Id);
    Assert.Equal(parentDeploymentType.Id, deploymentType.ParentId);
    Assert.Equal(newDeploymentType.Name, deploymentType.Name);
    deploymentType.ActiveFromDate.Should().BeOnOrAfter(testStart);
    deploymentType.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestGetAllDeploymentTypes()
  {
    // Arrange
    var existingDeploymentType = _seedData.DeploymentType;
    var childDeploymentType = _seedData.ChildDeploymentType;

    // Act
    var roles = await _client.GetFromJsonAsync<List<DeploymentType>>(_path, _options);

    // Assert
    // This does return all DeploymentTypes in a flat list
    Assert.Contains(roles!, t => t.Id == existingDeploymentType.Id);
    Assert.Contains(roles!, t => t.Id == childDeploymentType.Id);
  }

  [Fact]
  public async Task TestGetDeploymentTypeWithoutChildren()
  {
    // Arrange
    var existingDeploymentType = _seedData.DeploymentTypeWithoutChildren;

    // Act
    var deploymentType = await _client.GetFromJsonAsync<DeploymentTypeDto>($"{_path}/{existingDeploymentType.Id}", _options);

    // Assert
    Assert.Equal(deploymentType!.Id, existingDeploymentType.Id);
    Assert.Empty(deploymentType.Children);
  }

  [Fact]
  public async Task TestGetDeploymentTypeWithChildren()
  {
    // Arrange
    var existingDeploymentType = _seedData.DeploymentType;

    // Act
    var deploymentType = await _client.GetFromJsonAsync<DeploymentTypeDto>($"{_path}/{existingDeploymentType.Id}", _options);

    // Assert
    Assert.Equal(deploymentType!.Id, existingDeploymentType.Id);
    Assert.Contains(deploymentType.Children, t => t.Id == _seedData.ChildDeploymentType.Id);
  }

  [Fact]
  public async Task TestGetChildDeploymentType()
  {
    // Arrange
    var parentDeploymentType = _seedData.DeploymentType;
    var existingDeploymentType = _seedData.ChildDeploymentType;

    // Act
    var deploymentType = await _client.GetFromJsonAsync<DeploymentTypeDto>($"{_path}/{existingDeploymentType.Id}", _options);

    // Assert
    Assert.Equal(deploymentType!.Id, existingDeploymentType.Id);
    Assert.Equal(deploymentType.ParentId, parentDeploymentType.Id);
    Assert.NotNull(deploymentType.Parent);
    Assert.Empty(deploymentType.Children);
  }

  [Fact]
  public async Task TestUpdateDeploymentType_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingDeploymentType = _seedData.DeploymentType;
    var updateDto = new UpdateDeploymentTypeDto
    {
      Name = "New Name",
      RetiredAtDate = DateTime.UtcNow,
      ParentId = _seedData.ChildDeploymentType.Id,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingDeploymentType.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateDeploymentType_ForNonExistentDeploymentType_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateDeploymentTypeDto
    {
      Name = "New Name",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteDeploymentType()
  {
    // Arrange
    var role = _seedData.DeploymentTypeWithoutChildren;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteDeploymentTypeWithChildren()
  {
    // Arrange
    var role = _seedData.DeploymentType;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
  }

}

public class DeploymentTypesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public DeploymentType DeploymentType = null!;
  public DeploymentType DeploymentTypeWithoutChildren = null!;
  public DeploymentType ChildDeploymentType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the DeploymentTypeTests class.
    // The DB is not re-initialized between tests.

    DeploymentType = db.DeploymentTypes.Add(new DeploymentType
    {
      Name = "Test Deployment Type",
    }).Entity;
    db.SaveChanges(true);
    
    DeploymentTypeWithoutChildren = db.DeploymentTypes.Add(new DeploymentType
    {
      Name = "DeploymentType Without Children",
    }).Entity;
    db.SaveChanges(true);

    ChildDeploymentType = db.DeploymentTypes.Add(new DeploymentType
    {
      Name = "Child DeploymentType",
      Parent = DeploymentType
    }).Entity;
    db.SaveChanges(true);
  }
}
