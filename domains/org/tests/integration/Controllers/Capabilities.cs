
using System.Net;
using Org.DTOs;
using Org.Entities;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class CapabilitiesTests
    : TestsBase<CapabilitysSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/capabilities";

  public CapabilitiesTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestGetAllCapabilities()
  {
    // Arrange
    var existingCapability = _seedData.Capability;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Capability>>(_path, _options);

    // Assert
    // This does return all Capabilitys in a flat list
    Assert.Contains(roles!, t => t.Id == existingCapability.Id);
  }


  [Fact]
  public async Task TestCreateCapabilityForRole()
  {
    // Arrange
    var existingRole = _seedData.Role;
    var testStart = DateTime.UtcNow;
    var newCapability = new CreateCapabilityDto
    {
      RoleId = _seedData.Role.Id,
      CapabilityTypeId = _seedData.CapabilityType.Id,
    };

    // Act
    var capability = await _client.PostAsJsonAsync($"/roles/{existingRole.Id}/capabilities", newCapability, _options)
      .ContinueWith<CapabilityDto?>(t => t.Result.Content.ReadFromJsonAsync<CapabilityDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, capability!.Id);
    Assert.Equal(newCapability.RoleId, capability.RoleId);
    Assert.Equal(newCapability.CapabilityTypeId, capability.CapabilityTypeId);
    // capability.ActiveFromDate.Should().BeOnOrAfter(testStart);
    // capability.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestGetAllCapabilitiesForRole()
  {
    // Arrange
    var existingRole = _seedData.Role;
    var existingCapability = _seedData.Capability;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Capability>>($"/roles/{existingRole.Id}/capabilities", _options);

    // Assert
    // This does return all Capabilitys in a flat list
    Assert.Contains(roles!, t => t.Id == existingCapability.Id);
  }

  [Fact]
  public async Task TestDeleteCapability()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var existingRole = _seedData.Role;
    var existingCapability = _seedData.Capability;

    // Act
    var deleteResponse = await _client.DeleteAsync($"/roles/{existingRole.Id}/capabilities/{existingCapability.Id}");
    var updatedCapability = await _client.GetFromJsonAsync<Capability>($"/capabilities/{existingCapability.Id}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    updatedCapability!.RetiredAtDate.Should().BeOnOrAfter(testStart);
  }

  // [Fact]
  // public async Task TestUpdateCapability_OnSuccess_ReturnsNoContent()
  // {
  //   // Arrange
  //   var existingCapability = _seedData.Capability;
  //   var updateDto = new UpdateCapabilityDto
  //   {
  //     Name = "New Name",
  //     RetiredAtDate = DateTime.UtcNow,
  //     ParentId = _seedData.ChildCapability.Id,
  //   };
  //
  //   // Act
  //   var response = await _client.PutAsJsonAsync($"{_path}/{existingCapability.Id}", updateDto, _options);
  //
  //   // Assert
  //   Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  // }
  //
  // [Fact]
  // public async Task TestUpdateCapability_ForNonExistentCapability_ReturnsNotFound()
  // {
  //   // Arrange
  //   var nonexistentId = 4352345;
  //   var updateDto = new UpdateCapabilityDto
  //   {
  //     Name = "New Name",
  //     RetiredAtDate = DateTime.UtcNow,
  //   };
  //
  //   // Act
  //   var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);
  //
  //   // Assert
  //   Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  // }
  //
  //
  // [Fact]
  // public async Task TestDeleteCapabilityWithChildren()
  // {
  //   // Arrange
  //   var role = _seedData.Capability;
  //
  //   // Act
  //   var response = await _client.DeleteAsync($"{_path}/{role.Id}");
  //
  //   // Assert
  //   Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
  // }
  //
}

public class CapabilitysSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public RoleType RoleType = null!;
  public Role Role = null!;
  public CapabilityType CapabilityType = null!;
  public Capability Capability = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the CapabilityTests class.
    // The DB is not re-initialized between tests.
    //
    RoleType = new RoleType
    {
      Name = "Test Role Type",
    };
    db.RoleTypes.Add(RoleType);
    db.SaveChanges();

    Role = new Role
    {
      RoleTypeId = RoleType.Id,
    };
    db.Roles.Add(Role);
    db.SaveChanges();

    CapabilityType = new CapabilityType
    {
      Name = "Test Capability Type",
    };
    db.CapabilityTypes.Add(CapabilityType);
    db.SaveChanges();

    Capability = new Capability
    {
      RoleId = Role.Id,
      CapabilityTypeId = CapabilityType.Id,
    };
    db.Capabilities.Add(Capability);
    db.SaveChanges();
  }
}
