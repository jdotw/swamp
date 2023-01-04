using Delivery.DTOs;
using Delivery.Entities;
using FluentAssertions;
using Delivery.Repository;
using System.Security.Cryptography;

namespace Delivery.IntegrationTests;

public class IndividualTests
    : TestsBase<IndividualsSeedDataClass>, IClassFixture<CustomWebApplicationFactory<Program>>
{
  public IndividualTests(CustomWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestGetAllTribeRolesByIndividualId()
  {
    // Arrange
    var individualId = _seedData.IndividualId;

    // Act
    var tribeRoles = await _client.GetFromJsonAsync<List<SquadRoleDto>>($"/individuals/{individualId}/triberoles", _options);

    // Assert
    tribeRoles.Should().NotBeNullOrEmpty();
    tribeRoles.Should().ContainSingle(t => t.Id == _seedData.ExistingTribeRoleId);
    tribeRoles.Should().OnlyContain(t => t.IndividualId == individualId);
  }

  [Fact]
  public async Task TestGetAllSquadRolesByIndividualId()
  {
    // Arrange
    var individualId = _seedData.IndividualId;

    // Act
    var squadRoles = await _client.GetFromJsonAsync<List<TribeRoleDto>>($"/individuals/{individualId}/squadroles", _options);

    // Assert
    squadRoles.Should().NotBeNullOrEmpty();
    squadRoles.Should().ContainSingle(t => t.Id == _seedData.ExistingSquadRoleId);
    squadRoles.Should().OnlyContain(t => t.IndividualId == individualId);
  }
}

public class IndividualsSeedDataClass : ISeedDataClass
{
  public int IndividualId = 1324;
  public int ExistingTribeId;
  public int ExistingSquadId;
  public int ExistingSquadRoleTypeId;
  public int ExistingSquadRoleId;
  public int ExistingTribeRoleTypeId;
  public int ExistingTribeRoleId;

  public void InitializeDbForTests(DeliveryDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the IndividualTests class.
    // The DB is *NOT* re-initialized between tests
    // in the same class.
    var tribeResult = db.Tribes.Add(new Tribe
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Tribe",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null
    });
    db.SaveChanges(true);
    ExistingTribeId = tribeResult.Entity.Id;

    var squadResult = db.Squads.Add(new Squad
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Squad",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null,
      TribeId = ExistingTribeId
    });
    db.SaveChanges(true);
    ExistingSquadId = squadResult.Entity.Id;

    var squadRoleTypeResult = db.SquadRoleTypes.Add(new SquadRoleType
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Squad Role Type",
    });
    db.SaveChanges(true);
    ExistingSquadRoleTypeId = squadRoleTypeResult.Entity.Id;

    var squadRoleResult = db.SquadRoles.Add(new SquadRole
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      IndividualId = IndividualId,
      SquadId = ExistingSquadId,
      SquadRoleTypeId = ExistingSquadRoleTypeId
    });
    db.SaveChanges(true);
    ExistingSquadRoleId = squadRoleResult.Entity.Id;

    var tribeRoleTypeResult = db.TribeRoleTypes.Add(new TribeRoleType
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Tribe Role Type",
    });
    db.SaveChanges(true);
    ExistingTribeRoleTypeId = tribeRoleTypeResult.Entity.Id;

    var tribeRoleResult = db.TribeRoles.Add(new TribeRole
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      IndividualId = IndividualId,
      TribeId = ExistingTribeId,
      TribeRoleTypeId = ExistingTribeRoleTypeId
    });
    db.SaveChanges(true);
    ExistingTribeRoleId = tribeRoleResult.Entity.Id;

  }
}