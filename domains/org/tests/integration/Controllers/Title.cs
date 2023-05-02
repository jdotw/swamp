using System.Net;
using Org.DTOs;
using Org.Entities;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class TitleTests
    : TestsBase<TitlesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/titles";

  public TitleTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateTitleForLevel()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTitle = new CreateTitleDto
    {
      Name = "New Title",
      LevelId = _seedData.Level.Id,
    };

    // Act
    var title = await _client.PostAsJsonAsync(_path, newTitle, _options)
      .ContinueWith<TitleDto?>(t => t.Result.Content.ReadFromJsonAsync<TitleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, title!.Id);
    Assert.Equal(newTitle.Name, title.Name);
    Assert.Equal(newTitle.LevelId, title.LevelId);
    Assert.Equal(newTitle.TrackId, title.TrackId);
    title.ActiveFromDate.Should().BeOnOrAfter(testStart);
    title.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestCreateTitleForTrackLevel()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTitle = new CreateTitleDto
    {
      Name = "New Title",
      LevelId = _seedData.Level.Id,
      TrackId = _seedData.Track.Id,
    };

    // Act
    var title = await _client.PostAsJsonAsync(_path, newTitle, _options)
      .ContinueWith<TitleDto?>(t => t.Result.Content.ReadFromJsonAsync<TitleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, title!.Id);
    Assert.Equal(newTitle.Name, title.Name);
    Assert.Equal(newTitle.LevelId, title.LevelId);
    Assert.Equal(newTitle.TrackId, title.TrackId);
    title.ActiveFromDate.Should().BeOnOrAfter(testStart);
    title.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestCreateTitleForTrack()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTitle = new CreateTitleDto
    {
      Name = "New Title",
      LevelId = _seedData.Level.Id,
      TrackId = _seedData.Track.Id,
    };

    // Act
    var title = await _client.PostAsJsonAsync(_path, newTitle, _options)
      .ContinueWith<TitleDto?>(t => t.Result.Content.ReadFromJsonAsync<TitleDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, title!.Id);
    Assert.Equal(newTitle.Name, title.Name);
    Assert.Equal(newTitle.LevelId, title.LevelId);
    Assert.Equal(newTitle.TrackId, title.TrackId);
    title.ActiveFromDate.Should().BeOnOrAfter(testStart);
    title.RetiredAtDate.Should().Be(DateTimeOffset.MinValue);
  }

  [Fact]
  public async Task TestGetAllTitles()
  {
    // Arrange
    var existingTitleForLevel = _seedData.TitleForLevel;
    var existingTitleForTrackLevel = _seedData.TitleForTrackLevel;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Title>>($"{_path}", _options);

    // Assert
    // This does return all Titles in a flat list
    Assert.Contains(roles!, t => t.Id == existingTitleForLevel.Id);
    Assert.Contains(roles!, t => t.Id == existingTitleForTrackLevel.Id);
  }

  [Fact]
  public async Task TestGetTitleForLevel()
  {
    // Arrange
    var existingTitle = _seedData.TitleForLevel;

    // Act
    var title = await _client.GetFromJsonAsync<TitleDto>($"{_path}/{existingTitle.Id}", _options);

    // Assert
    Assert.Equal(title!.Id, existingTitle.Id);
    Assert.Equal(title.Name, existingTitle.Name);
    Assert.Equal(title.LevelId, existingTitle.LevelId);
    Assert.Equal(title.TrackId, existingTitle.TrackId);
  }

  [Fact]
  public async Task TestGetTitleForTrackLevel()
  {
    // Arrange
    var existingTitle = _seedData.TitleForTrackLevel;

    // Act
    var title = await _client.GetFromJsonAsync<TitleDto>($"{_path}/{existingTitle.Id}", _options);

    // Assert
    Assert.Equal(title!.Id, existingTitle.Id);
    Assert.Equal(title.Name, existingTitle.Name);
    Assert.Equal(title.LevelId, existingTitle.LevelId);
    Assert.Equal(title.TrackId, existingTitle.TrackId);
  }

  [Fact]
  public async Task TestUpdateTitle_ForNonExistentTitle_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateTitleDto
    {
      Name = "New Manager Title",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{nonexistentId}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateTitleForLevel_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTitle = _seedData.TitleForLevel;
    var updateDto = new UpdateTitleDto
    {
      Name = "New Manager Title",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTitle.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateTitleForTrackLevel_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTitle = _seedData.TitleForTrackLevel;
    var updateDto = new UpdateTitleDto
    {
      Name = "New Manager Title",
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTitle.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTitleForLevel()
  {
    // Arrange
    var role = _seedData.TitleForLevel;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteTitleForTrackLevel()
  {
    // Arrange
    var role = _seedData.TitleForTrackLevel;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

}

public class TitlesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Title TitleForLevel = null!;
  public Title TitleForTrackLevel = null!;
  public Level Level = null!;
  public Track Track = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TitleTests class.
    // The DB is not re-initialized between tests.
    Level = db.Levels.Add(new Level
    {
      Index = 1,
      ExternalId = "1",
    }).Entity;
    db.SaveChanges(true);

    Track = db.Tracks.Add(new Track
    {
      Name = "Test Track",
    }).Entity;
    db.SaveChanges(true);

    TitleForLevel = db.Titles.Add(new Title
    {
      Name = "Manager",
      LevelId = Level.Id,
    }).Entity;
    db.SaveChanges(true);

    TitleForTrackLevel = db.Titles.Add(new Title
    {
      Name = "Manager",
      LevelId = Level.Id,
      TrackId = Track.Id,
    }).Entity;
    db.SaveChanges(true);
  }
}
