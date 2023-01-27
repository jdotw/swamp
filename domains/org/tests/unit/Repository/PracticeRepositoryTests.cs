using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class PracticeRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<PracticeRepository> _repo;

  public PracticeRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<PracticeRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdatePracticeFields_UpdatesExpectedFields()
  {
    var existingPractice = new Practice()
    {
      Id = 1,
      Name = "Practice Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Practice()
    {
      Id = existingPractice.Id,
      Name = existingPractice.Name,
      Description = existingPractice.Description,
      DisbandedDate = existingPractice.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingPractice);
  }

  [Fact]
  public async Task UpdatePracticeAsync_Updates_Fields()
  {
    var existingPractice = new Practice()
    {
      Id = 1,
      Name = "Practice Name",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingPractice);
    _repo.Setup(x => x.Update(It.IsAny<Practice>()));
    var update = new Practice()
    {
      Id = existingPractice.Id,
      Name = existingPractice.Name,
      Description = existingPractice.Description,
      DisbandedDate = existingPractice.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingPractice), Times.Once);
    _repo.Verify(x => x.Update(existingPractice), Times.Once);
  }
}