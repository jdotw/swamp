
using System.Net;
using Org.DTOs;
using Org.Entities;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class CapabilityTypeTests
    : TestsBase<CapabilityTypesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/capabilitytypes";

  public CapabilityTypeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateCapabilityType()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newCapabilityType = new CreateCapabilityTypeDto
    {
      Name = "Test"
    };

    // Act
    var capabilityType = await _client.PostAsJsonAsync(_path, newCapabilityType, _options)
      .ContinueWith<CapabilityTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<CapabilityTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, capabilityType!.Id);
    Assert.Equal(newCapabilityType.Name, capabilityType.Name);
    capabilityType.ActiveFromDate.Should().BeOnOrAfter(testStart);
    capabilityType.RetiredAtDate.Should().BeNull();
  }

  [Fact]
  public async Task TestCreateChildCapabilityType()
  {
    // Arrange
    var parentCapabilityType = _seedData.CapabilityType;
    var testStart = DateTime.UtcNow;
    var newCapabilityType = new CreateCapabilityTypeDto
    {
      Name = "Test Child",
      ParentId = parentCapabilityType.Id
    };

    // Act
    var capabilityType = await _client.PostAsJsonAsync(_path, newCapabilityType, _options)
      .ContinueWith<CapabilityTypeDto?>(t => t.Result.Content.ReadFromJsonAsync<CapabilityTypeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, capabilityType!.Id);
    Assert.Equal(parentCapabilityType.Id, capabilityType.ParentId);
    Assert.Equal(newCapabilityType.Name, capabilityType.Name);
    capabilityType.ActiveFromDate.Should().BeOnOrAfter(testStart);
    capabilityType.RetiredAtDate.Should().BeNull();
  }

  [Fact]
  public async Task TestGetAllCapabilityTypes()
  {
    // Arrange
    var existingCapabilityType = _seedData.CapabilityType;
    var childCapabilityType = _seedData.ChildCapabilityType;

    // Act
    var roles = await _client.GetFromJsonAsync<List<CapabilityType>>(_path, _options);

    // Assert
    // This does return all CapabilityTypes in a flat list
    Assert.Contains(roles!, t => t.Id == existingCapabilityType.Id);
    Assert.Contains(roles!, t => t.Id == childCapabilityType.Id);
  }

  [Fact]
  public async Task TestGetCapabilityTypeWithoutChildren()
  {
    // Arrange
    var existingCapabilityType = _seedData.CapabilityTypeWithoutChildren;

    // Act
    var capabilityType = await _client.GetFromJsonAsync<CapabilityTypeDto>($"{_path}/{existingCapabilityType.Id}", _options);

    // Assert
    Assert.Equal(capabilityType!.Id, existingCapabilityType.Id);
    Assert.Empty(capabilityType.Children);
  }

  [Fact]
  public async Task TestGetCapabilityTypeWithChildren()
  {
    // Arrange
    var existingCapabilityType = _seedData.CapabilityType;

    // Act
    var capabilityType = await _client.GetFromJsonAsync<CapabilityTypeDto>($"{_path}/{existingCapabilityType.Id}", _options);

    // Assert
    Assert.Equal(capabilityType!.Id, existingCapabilityType.Id);
    Assert.Contains(capabilityType.Children, t => t.Id == _seedData.ChildCapabilityType.Id);
  }

  [Fact]
  public async Task TestGetChildCapabilityType()
  {
    // Arrange
    var parentCapabilityType = _seedData.CapabilityType;
    var existingCapabilityType = _seedData.ChildCapabilityType;

    // Act
    var capabilityType = await _client.GetFromJsonAsync<CapabilityTypeDto>($"{_path}/{existingCapabilityType.Id}", _options);

    // Assert
    Assert.Equal(capabilityType!.Id, existingCapabilityType.Id);
    Assert.Equal(capabilityType.ParentId, parentCapabilityType.Id);
    Assert.NotNull(capabilityType.Parent);
    Assert.Empty(capabilityType.Children);
  }

  [Fact]
  public async Task TestUpdateCapabilityType_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingCapabilityType = _seedData.CapabilityType;
    var updateDto = new UpdateCapabilityTypeDto
    {
      Name = "New Name",
      RetiredAtDate = DateTime.UtcNow,
      ParentId = _seedData.ChildCapabilityType.Id,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingCapabilityType.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateCapabilityType_ForNonExistentCapabilityType_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateCapabilityTypeDto
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
  public async Task TestDeleteCapabilityType()
  {
    // Arrange
    var role = _seedData.CapabilityTypeWithoutChildren;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteCapabilityTypeWithChildren()
  {
    // Arrange
    var role = _seedData.CapabilityType;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
  }

}

public class CapabilityTypesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public CapabilityType CapabilityType = null!;
  public CapabilityType CapabilityTypeWithoutChildren = null!;
  public CapabilityType ChildCapabilityType = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the CapabilityTypeTests class.
    // The DB is not re-initialized between tests.
    CapabilityType = db.CapabilityTypes.Add(new CapabilityType
    {
      Name = "Test Capability Type",
    }).Entity;
    db.SaveChanges(true);

    CapabilityTypeWithoutChildren = db.CapabilityTypes.Add(new CapabilityType
    {
      Name = "Capability Type Without Children",
    }).Entity;
    db.SaveChanges(true);

    ChildCapabilityType = db.CapabilityTypes.Add(new CapabilityType
    {
      Name = "Child Capability Type",
      Parent = CapabilityType
    }).Entity;
    db.SaveChanges(true);
  }
}
