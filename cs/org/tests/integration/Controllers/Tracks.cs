using System.Net;
using Org.DTOs;
using Org.Entities;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class TrackTests
    : TestsBase<TracksSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/tracks";

  public TrackTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateTrack()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newTrack = new CreateTrackDto
    {
      Name = "New Track",
    };

    // Act
    var track = await _client.PostAsJsonAsync(_path, newTrack, _options)
      .ContinueWith<TrackDto?>(t => t.Result.Content.ReadFromJsonAsync<TrackDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, track!.Id);
    Assert.Equal(newTrack.Name, track.Name);
    track.ActiveFromDate.Should().BeOnOrAfter(testStart);
    track.RetiredAtDate.Should().BeNull();
  }

  [Fact]
  public async Task TestGetAllTracks()
  {
    // Arrange
    var existingTrack = _seedData.Track;

    // Act
    var roles = await _client.GetFromJsonAsync<List<Track>>($"{_path}", _options);

    // Assert
    // This does return all Tracks in a flat list
    Assert.Contains(roles!, t => t.Id == existingTrack.Id);
  }

  [Fact]
  public async Task TestGetTrack()
  {
    // Arrange
    var existingTrack = _seedData.Track;

    // Act
    var track = await _client.GetFromJsonAsync<TrackDto>($"{_path}/{existingTrack.Id}", _options);

    // Assert
    Assert.Equal(track!.Id, existingTrack.Id);
  }

  [Fact]
  public async Task TestUpdateTrack_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingTrack = _seedData.Track;
    var updateDto = new UpdateTrackDto
    {
      Name = "New Manager Title",
      ParentId = _seedData.Track2.Id,
      RetiredAtDate = DateTime.UtcNow,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingTrack.Id}", updateDto, _options);
    var updated = await _client.GetFromJsonAsync<TrackDto>($"{_path}/{existingTrack.Id}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.Equal(updateDto.Name, updated!.Name);
    Assert.Equal(updateDto.RetiredAtDate, updated.RetiredAtDate);
    Assert.Equal(updateDto.ParentId, updated.ParentId);
  }

  [Fact]
  public async Task TestUpdateTrack_ForNonExistentTrack_ReturnsNotFound()
  {
    // Arrange
    var nonexistentId = 4352345;
    var updateDto = new UpdateTrackDto
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
  public async Task TestDeleteTrack()
  {
    // Arrange
    var role = _seedData.Track;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{role.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

}

public class TracksSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Track Track = null!;
  public Track Track2 = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the TrackTests class.
    // The DB is not re-initialized between tests.
    Track = db.Tracks.Add(new Track
    {
      Name = "Manager",
    }).Entity;
    db.SaveChanges(true);

    Track2 = db.Tracks.Add(new Track
    {
      Name = "Employee",
    }).Entity;
    db.SaveChanges(true);
  }
}
