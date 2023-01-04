using Capability.DTOs;
using Capability.Entities;
using FluentAssertions;
using Capability.Repository;
using System.Security.Cryptography;

namespace Capability.IntegrationTests;

public class IndividualTests
    : TestsBase<IndividualsSeedDataClass>, IClassFixture<CustomWebApplicationFactory<Program>>
{
  public IndividualTests(CustomWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestGetAllPracticeRolesByIndividualId()
  {
    // Arrange
    var individualId = _seedData.IndividualId;

    // Act
    var practiceRoles = await _client.GetFromJsonAsync<List<ChapterRoleDto>>($"/individuals/{individualId}/practiceroles", _options);

    // Assert
    practiceRoles.Should().NotBeNullOrEmpty();
    practiceRoles.Should().ContainSingle(t => t.Id == _seedData.ExistingPracticeRoleId);
    practiceRoles.Should().OnlyContain(t => t.IndividualId == individualId);
  }

  [Fact]
  public async Task TestGetAllChapterRolesByIndividualId()
  {
    // Arrange
    var individualId = _seedData.IndividualId;

    // Act
    var chapterRoles = await _client.GetFromJsonAsync<List<PracticeRoleDto>>($"/individuals/{individualId}/chapterroles", _options);

    // Assert
    chapterRoles.Should().NotBeNullOrEmpty();
    chapterRoles.Should().ContainSingle(t => t.Id == _seedData.ExistingChapterRoleId);
    chapterRoles.Should().OnlyContain(t => t.IndividualId == individualId);
  }
}

public class IndividualsSeedDataClass : ISeedDataClass
{
  public int IndividualId = 1324;
  public int ExistingPracticeId;
  public int ExistingChapterId;
  public int ExistingChapterRoleTypeId;
  public int ExistingChapterRoleId;
  public int ExistingPracticeRoleTypeId;
  public int ExistingPracticeRoleId;

  public void InitializeDbForTests(CapabilityDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the IndividualTests class.
    // The DB is *NOT* re-initialized between tests
    // in the same class.
    var practiceResult = db.Practices.Add(new Practice
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Practice",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null
    });
    db.SaveChanges(true);
    ExistingPracticeId = practiceResult.Entity.Id;

    var chapterResult = db.Chapters.Add(new Chapter
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Chapter",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null,
      PracticeId = ExistingPracticeId
    });
    db.SaveChanges(true);
    ExistingChapterId = chapterResult.Entity.Id;

    var chapterRoleTypeResult = db.ChapterRoleTypes.Add(new ChapterRoleType
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Chapter Role Type",
    });
    db.SaveChanges(true);
    ExistingChapterRoleTypeId = chapterRoleTypeResult.Entity.Id;

    var chapterRoleResult = db.ChapterRoles.Add(new ChapterRole
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      IndividualId = IndividualId,
      ChapterId = ExistingChapterId,
      ChapterRoleTypeId = ExistingChapterRoleTypeId
    });
    db.SaveChanges(true);
    ExistingChapterRoleId = chapterRoleResult.Entity.Id;

    var practiceRoleTypeResult = db.PracticeRoleTypes.Add(new PracticeRoleType
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      Name = "Existing Practice Role Type",
    });
    db.SaveChanges(true);
    ExistingPracticeRoleTypeId = practiceRoleTypeResult.Entity.Id;

    var practiceRoleResult = db.PracticeRoles.Add(new PracticeRole
    {
      Id = RandomNumberGenerator.GetInt32(1, 1000),
      IndividualId = IndividualId,
      PracticeId = ExistingPracticeId,
      PracticeRoleTypeId = ExistingPracticeRoleTypeId
    });
    db.SaveChanges(true);
    ExistingPracticeRoleId = practiceRoleResult.Entity.Id;

  }
}