using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class ChapterRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<ChapterRepository> _repo;

  public ChapterRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<ChapterRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateChapterFields_UpdatesExpectedFields()
  {
    var existingChapter = new Chapter()
    {
      Id = 1,
      Name = "Chapter Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Chapter()
    {
      Id = existingChapter.Id,
      Name = existingChapter.Name,
      Description = existingChapter.Description,
      DisbandedDate = existingChapter.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingChapter);
  }

  [Fact]
  public async Task UpdateChapterAsync_Updates_Fields()
  {
    var existingChapter = new Chapter()
    {
      Id = 1,
      Name = "Chapter Name",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingChapter);
    _repo.Setup(x => x.Update(It.IsAny<Chapter>()));
    var update = new Chapter()
    {
      Id = existingChapter.Id,
      Name = existingChapter.Name,
      Description = existingChapter.Description,
      DisbandedDate = existingChapter.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingChapter), Times.Once);
    _repo.Verify(x => x.Update(existingChapter), Times.Once);
  }
}