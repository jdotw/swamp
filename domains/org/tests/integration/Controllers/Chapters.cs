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

public class ChapterTests
    : TestsBase<ChaptersSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  public ChapterTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  private string Path(int practiceId) => $"/practices/{practiceId}/chapters";
  private string Path(int practiceId, int chapterId) => $"/practices/{practiceId}/chapters/{chapterId}";

  [Fact]
  public async Task TestCreateChapter()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var testStart = DateTime.UtcNow;
    var newChapter = new CreateChapterDto
    {
      Name = "Test Chapter",
    };

    // Act
    var chapter = await _client.PostAsJsonAsync(Path(practiceId), newChapter, _options)
      .ContinueWith<ChapterDto?>(t => t.Result.Content.ReadFromJsonAsync<ChapterDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, chapter!.Id);
    Assert.Equal(newChapter.Name, chapter.Name);
  }

  [Fact]
  public async Task TestGetAllChapters()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var existingChapter = _seedData.Chapter;

    // Act
    var chapters = await _client.GetFromJsonAsync<List<Chapter>>(Path(practiceId), _options);

    // Assert
    Assert.Contains(chapters!, t => t.Id == existingChapter.Id);
  }

  [Fact]
  public async Task TestGetChapter()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var existingChapter = _seedData.Chapter;

    // Act
    var chapter = await _client.GetFromJsonAsync<ChapterDto>(Path(practiceId, existingChapter.Id), _options);

    // Assert
    Assert.Equal(chapter!.Id, existingChapter.Id);
    Assert.Equal(chapter.Name, existingChapter.Name);
  }

  [Fact]
  public async Task TestUpdateChapter_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var existingChapter = _seedData.Chapter;
    var updateDto = new UpdateChapterDto
    {
      Name = "new Name",
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(practiceId, existingChapter.Id), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdateChapter_ForNonExistentChapter_ReturnsNotFound()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var nonExistentChapterId = 34252532;
    var existingChapter = _seedData.Chapter;
    var updateDto = new UpdateChapterDto
    {
      Name = existingChapter.Name,
    };

    // Act
    var response = await _client.PutAsJsonAsync(Path(practiceId, nonExistentChapterId), updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeleteChapter()
  {
    // Arrange
    var practiceId = _seedData.Practice.Id;
    var chapter = _seedData.Chapter;

    // Act
    var response = await _client.DeleteAsync(Path(practiceId, chapter.Id));

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class ChaptersSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Practice Practice = null!;
  public Chapter Chapter = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the ChapterTests class.
    // The DB is not re-initialized between tests.
    Practice = db.Practices.Add(new Practice
    {
      Name = "Practice Name",
    }).Entity;
    db.SaveChanges(true);

    Chapter = db.Chapters.Add(new Chapter
    {
      PracticeId = Practice.Id,
      Name = "Chapter Name",
    }).Entity;
    db.SaveChanges(true);
  }
}