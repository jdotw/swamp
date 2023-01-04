using System.Net;
using System.Text.Json;
using Delivery.DTOs;
using Delivery.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using FluentAssertions;
using Delivery.Repository;

namespace Delivery.IntegrationTests;

public class SquadRoleTests
    : TestsBase<SquadRolesSeedDataClass>, IClassFixture<CustomWebApplicationFactory<Program>>
{
  public SquadRoleTests(CustomWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  private string _basePath(int? tribeId = null, int? squadId = null)
  {
    return $"/tribes/{tribeId ?? _seedData.ExistingTribeId}/squads/{squadId ?? _seedData.ExistingSquadId}/roles";
  }

  private async Task<SquadRoleDto?> CreateSquadRole(int tribeId, int individualId, int squadRoleTypeId, int squadId)
  {
    var role = await _client.PostAsJsonAsync(_basePath(),
      new AddSquadRoleDto { IndividualId = individualId, SquadRoleTypeId = squadRoleTypeId }, _options)
       .ContinueWith<SquadRoleDto?>(t => t.Result.Content.ReadFromJsonAsync<SquadRoleDto>(_options).Result);
    return role;
  }

  [Fact]
  public async Task TestCreateSquadRole()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var individualId = 1;
    var tribeId = _seedData.ExistingTribeId;
    var squadRoleTypeId = _seedData.ExistingSquadRoleTypeId;
    var squadId = _seedData.ExistingSquadId;

    // Act
    var role = await CreateSquadRole(tribeId, individualId, squadRoleTypeId, squadId);

    // Assert
    Assert.NotNull(role);
    Assert.Equal(role.IndividualId, individualId);
    Assert.Equal(role.SquadRoleType.Id, squadRoleTypeId);
    Assert.Equal(role.Squad.Id, squadId);
  }

  [Fact]
  public async Task TestGetAllSquadRoles()
  {
    // Arrange
    var individualId = 1;
    var expectedSquad = await CreateSquadRole(_seedData.ExistingTribeId,
                                              individualId,
                                              _seedData.ExistingSquadRoleTypeId,
                                              _seedData.ExistingSquadId);

    // Act
    var squads = await _client.GetFromJsonAsync<List<SquadRoleDto>>(_basePath(), _options);

    // Assert
    Assert.NotNull(squads);
    Assert.Contains(squads, t => t.Id == expectedSquad!.Id);
  }

  [Fact]
  public async Task TestGetSquadRole()
  {
    // Arrange
    var individualId = 1;
    var expectedSquad = await CreateSquadRole(_seedData.ExistingTribeId,
                                              individualId,
                                              _seedData.ExistingSquadRoleTypeId,
                                              _seedData.ExistingSquadId);

    Assert.NotNull(expectedSquad);

    // Act
    var role = await _client.GetFromJsonAsync<SquadRoleDto>($"{_basePath()}/{expectedSquad.Id}", _options);

    // Assert
    Assert.NotNull(role);
    role.Id.Should().Be(expectedSquad.Id);
    role.IndividualId.Should().Be(expectedSquad.IndividualId);
    role.SquadRoleType.Id.Should().Be(expectedSquad.SquadRoleType.Id);
  }

  [Fact]
  public async Task TestUpdateSquadRole()
  {
    // Arrange
    var squadId = _seedData.SquadRoleToUpdateId;
    var path = $"{_basePath()}/{squadId}";

    // Act
    var updateDto = new UpdateSquadRoleDto
    {
      EndDate = DateTime.UtcNow
    };
    var response = await _client.PutAsJsonAsync(path, updateDto, _options);
    var updatedSquad = await _client.GetFromJsonAsync<SquadRoleDto>(path, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.NotNull(updatedSquad);
    Assert.Equal(updateDto.EndDate, updatedSquad.EndDate);
  }

  [Fact]
  public async Task TestDeleteSquad()
  {
    // Arrange
    var squadId = _seedData.SquadRoleToDeleteId;
    var path = $"{_basePath()}/{squadId}";

    // Act
    var response = await _client.DeleteAsync(path);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(
      () => _client.GetFromJsonAsync<Squad>(path, _options));
    Assert.Contains("404 (Not Found)", ex.Message);
  }
}

public class SquadRolesSeedDataClass : ISeedDataClass
{
  public int ExistingTribeId;
  public int ExistingSquadId;
  public int ExistingSquadRoleTypeId;
  public int SquadRoleToUpdateId;
  public int SquadRoleToDeleteId;

  public void InitializeDbForTests(DeliveryDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the SquadRoleTests class.
    // The DB is *NOT* re-initialized between tests
    // in the same class.
    var tribeResult = db.Tribes.Add(new Tribe
    {
      Name = "Existing Tribe",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null
    });
    db.SaveChanges(true);
    ExistingTribeId = tribeResult.Entity.Id;

    var squadResult = db.Squads.Add(new Squad
    {
      Name = "Existing Squad",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null,
      TribeId = ExistingTribeId
    });
    db.SaveChanges(true);
    ExistingSquadId = squadResult.Entity.Id;

    var firstSquadRoleTypeResult = db.SquadRoleTypes.Add(new SquadRoleType
    {
      Name = "Existing Squad Role Type",
    });
    db.SaveChanges(true);
    ExistingSquadRoleTypeId = firstSquadRoleTypeResult.Entity.Id;

    var squadRoleTypeResult = db.SquadRoleTypes.Add(new SquadRoleType
    {
      Name = "Existing Squad Role Type",
    });
    db.SaveChanges(true);
    ExistingSquadRoleTypeId = squadRoleTypeResult.Entity.Id;

    var squadRoleToUpdateResult = db.SquadRoles.Add(new SquadRole
    {
      IndividualId = 33,
      SquadId = ExistingSquadId,
      SquadRoleTypeId = ExistingSquadRoleTypeId
    });
    db.SaveChanges(true);
    SquadRoleToUpdateId = squadRoleToUpdateResult.Entity.Id;

    var squadRoleToDeleteResult = db.SquadRoles.Add(new SquadRole
    {
      IndividualId = 44,
      SquadId = ExistingSquadId,
      SquadRoleTypeId = ExistingSquadRoleTypeId
    });
    db.SaveChanges(true);
    SquadRoleToDeleteId = squadRoleToDeleteResult.Entity.Id;
  }
}