using System.Net;
using Org.DTOs;
using Org.Entities;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class DeploymentTests
    : TestsBase<DeploymentsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/deployments";

  public DeploymentTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateDeployment()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newDeployment = new CreateDeploymentDto
    {
      CapabilityId = _seedData.Capability.Id,
      TeamId = _seedData.Team.Id,
    };

    // Act
    var assignment = await _client.PostAsJsonAsync(_path, newDeployment, _options)
      .ContinueWith<DeploymentDto?>(t => t.Result.Content.ReadFromJsonAsync<DeploymentDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, assignment!.Id);
    Assert.Equal(newDeployment.CapabilityId, assignment.CapabilityId);
    Assert.Equal(newDeployment.TeamId, assignment.TeamId);
  }

  [Fact]
  public async Task TestGetAllDeployments()
  {
    // Arrange
    var existingDeployment = _seedData.Deployment;

    // Act
    var assignments = await _client.GetFromJsonAsync<List<Deployment>>($"{_path}", _options);

    // Assert
    Assert.Contains(assignments!, t => t.Id == existingDeployment.Id);
  }

  [Fact]
  public async Task TestGetDeployment()
  {
    // Arrange
    var existingDeployment = _seedData.Deployment;

    // Act
    var assignment = await _client.GetFromJsonAsync<DeploymentDto>($"{_path}/{existingDeployment.Id}", _options);

    // Assert
    Assert.Equal(assignment!.Id, existingDeployment.Id);
  }

  [Fact]
  public async Task TestUpdateDeployment_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingDeployment = _seedData.Deployment;
    var updateDto = new UpdateDeploymentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingDeployment.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateDeployment_ForNonExistentDeployment_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateDeploymentDto
    {
      EndDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteDeployment()
  {
    // Arrange
    var role = _seedData.Deployment;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class DeploymentsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public CapabilityType CapabilityType { get; set; } = null!;
  public Capability Capability { get; set; } = null!;
  public RoleType RoleType { get; set; } = null!;
  public Role Role { get; set; } = null!;
  public Deployment Deployment { get; set; } = null!;
  public Team Team { get; set; } = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the DeploymentTests class.
    // The DB is not re-initialized between tests.

    Team = db.Teams.Add(new Team
    {
      Type = "home",
      Name = "Seed Team",
    }).Entity;
    db.SaveChanges(true);

    RoleType = db.RoleTypes.Add(new RoleType
    {
      Name = "Seed Role Type",
    }).Entity;
    db.SaveChanges(true);

    Role = db.Roles.Add(new Role
    {
      RoleTypeId = RoleType.Id,
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

    Deployment = db.Deployments.Add(new Deployment
    {
      CapabilityId = Capability.Id,
      TeamId = Team.Id,
    }).Entity;
    db.SaveChanges(true);
  }
}
