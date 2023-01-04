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
    Console.WriteLine("At Constructor _seedData: " + _seedData);
    Console.WriteLine("At Constructor _seedData.ExistingSquadRoleTypeId: " + _seedData.ExistingSquadRoleTypeId);
  }

  private async Task<SquadRoleDto?> CreateSquadRole(int tribeId, int individualId, int squadRoleTypeId, int squadId)
  {
    var role = await _client.PostAsJsonAsync($"/tribes/{tribeId}/squads/{squadId}/roles",
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
    Console.WriteLine("In Test: squadId: " + squadId);

    // Act
    var role = await CreateSquadRole(tribeId, individualId, squadRoleTypeId, squadId);

    // Assert
    Assert.NotNull(role);
    Assert.Equal(role.IndividualId, individualId);
    Assert.Equal(role.SquadRoleType.Id, squadRoleTypeId);
    Assert.Equal(role.Squad.Id, squadId);
  }

  //   [Fact]
  //   public async Task TestGetAllSquads()
  //   {
  //     // Arrange
  //     var name = "Seen In Get All";
  //     var squad = await CreateSquad(name);

  //     // Act
  //     var squads = await _client.GetFromJsonAsync<List<Squad>>($"{_path}", _options);

  //     // Assert
  //     Assert.NotNull(squads);
  //     Assert.Contains(squads, t => t.Name == name);
  //   }

  //   [Fact]
  //   public async Task TestGetSquad()
  //   {
  //     // Arrange
  //     var name = "Single Get Squad";
  //     var createdSquad = await CreateSquad(name);
  //     Assert.NotNull(createdSquad);

  //     // Act
  //     var squad = await _client.GetFromJsonAsync<SquadDto>($"{_path}/{createdSquad.Id}", _options);

  //     // Assert
  //     Assert.NotNull(squad);
  //     squad.Name.Should().Be(name);
  //   }

  //   [Fact]
  //   public async Task TestUpdateSquad()
  //   {
  //     // Arrange
  //     var existingSquadId = 1;  // Seeded for update
  //     var path = $"{_path}/{existingSquadId}";

  //     // Act
  //     var updateDto = new UpdateSquadDto
  //     {
  //       Name = "Updated Squad",
  //       DisbandedDate = DateTime.UtcNow
  //     };
  //     var response = await _client.PutAsJsonAsync(path, updateDto, _options);
  //     var updatedSquad = await _client.GetFromJsonAsync<Squad>(path, _options);

  //     // Assert
  //     Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  //     Assert.NotNull(updatedSquad);
  //     Assert.Equal(updateDto.Name, updatedSquad.Name);
  //     Assert.Equal(updateDto.DisbandedDate, updatedSquad.DisbandedDate);
  //   }

  //   [Fact]
  //   public async Task TestDeleteSquad()
  //   {
  //     // Arrange
  //     var existingSquadId = 2;  // Seeded for delete
  //     var path = $"{_path}/{existingSquadId}";

  //     // Act
  //     var response = await _client.DeleteAsync(path);

  //     // Assert
  //     Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  //     // var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(() => _client.GetFromJsonAsync<Squad>(_path, _options));
  //     // Assert.Contains("404 (Not Found)", ex.Message);
  //   }
}

public class SquadRolesSeedDataClass : ISeedDataClass
{
  public int ExistingTribeId;
  public int ExistingSquadId;
  public int ExistingSquadRoleTypeId;

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

    Console.WriteLine("SquadRolesSeedDataClass.ExistingSquadRoleTypeId: " + ExistingSquadRoleTypeId);

    db.SquadRoleTypes.ToList().ForEach(t => Console.WriteLine(t.Id));
  }
}