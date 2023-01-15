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

public class TribeTests
    : TestsBase<TribesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/tribes";

  public TribeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateTribe()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTribe = new CreateTribeDto
    {
      Name = "Test Tribe",
    };

    // Act
    var tribe = await _client.PostAsJsonAsync(_path, newTribe, _options)
      .ContinueWith<TribeDto?>(t => t.Result.Content.ReadFromJsonAsync<TribeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, tribe!.Id);
    Assert.Equal(newTribe.Name, tribe.Name);
  }

  [Fact]
  public async Task TestGetAllTribes()
  {
    // Arrange
    var existingTribe = _seedData.Tribe;

    // Act
    var tribes = await _client.GetFromJsonAsync<List<Tribe>>($"{_path}", _options);

    // Assert
    Assert.Contains(tribes!, t => t.Id == existingTribe.Id);
  }

  [Fact]
  public async Task TestGetTribe()
  {
    // Arrange
    var existingTribe = _seedData.Tribe;

    // Act
    var tribe = await _client.GetFromJsonAsync<TribeDto>($"{_path}/{existingTribe.Id}", _options);

    // Assert
    Assert.Equal(tribe!.Id, existingTribe.Id);
    Assert.Equal(tribe.Name, existingTribe.Name);
  }

  [Fact]
  public async Task TestUpdateTribe_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTribe = _seedData.Tribe;
    var updateDto = new UpdateTribeDto
    {
      Name = "new Name",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTribe.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateTribe_ForNonExistentTribe_ReturnsNotFound()
  {
    // Arrange
    var existingTribe = _seedData.Tribe;
    var updateDto = new UpdateTribeDto
    {
      Name = existingTribe.Name,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTribe()
  {
    // Arrange
    var tribe = _seedData.Tribe;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{tribe.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class TribesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Tribe Tribe = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TribeTests class.
    // The DB is not re-initialized between tests.
    Tribe = db.Tribes.Add(new Tribe
    {
      Name = "Tribe Name",
    }).Entity;

    db.SaveChanges(true);
  }
}