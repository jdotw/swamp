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

public class LevelTests
    : TestsBase<LevelsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/levels";

  public LevelTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateLevel()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newLevel = new CreateLevelDto
    {
      IndividualContributorTitle = "IC Title",
      ManagerTitle = "Manager Title"
    };

    // Act
    var level = await _client.PostAsJsonAsync(_path, newLevel, _options)
      .ContinueWith<LevelDto?>(t => t.Result.Content.ReadFromJsonAsync<LevelDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, level!.Id);
    Assert.Equal(newLevel.IndividualContributorTitle, level.IndividualContributorTitle);
    Assert.Equal(newLevel.ManagerTitle, level.ManagerTitle);
    level.ActiveFromDate.Should().BeOnOrAfter(testStart);
    level.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestGetAllLevels()
  {
    // Arrange
    var existingLevel = _seedData.Level;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Level>>($"{_path}", _options);

    // Assert
    Assert.Contains(roles!, t => t.Id == existingLevel.Id);
  }

  [Fact]
  public async Task TestGetLevel()
  {
    // Arrange
    var existingLevel = _seedData.Level;

    // Act
    var level = await _client.GetFromJsonAsync<LevelDto>($"{_path}/{existingLevel.Id}", _options);

    // Assert
    Assert.Equal(level!.Id, existingLevel.Id);
  }

  [Fact]
  public async Task TestUpdateLevel_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingLevel = _seedData.Level;
    var updateDto = new UpdateLevelDto
    {
      IndividualContributorTitle = "New IC Title",
      ManagerTitle = "New Manager Title",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingLevel.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateLevel_ForNonExistentLevel_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateLevelDto
    {
      IndividualContributorTitle = "New IC Title",
      ManagerTitle = "New Manager Title",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteLevel()
  {
    // Arrange
    var role = _seedData.Level;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class LevelsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Level Level = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the LevelTests class.
    // The DB is not re-initialized between tests.

    Level = db.Levels.Add(new Level
    {
      IndividualContributorTitle = "Individual Contributor",
      ManagerTitle = "Manager",
    }).Entity;
    db.SaveChanges(true);
  }
}