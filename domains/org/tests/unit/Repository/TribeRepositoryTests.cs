using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class TribeRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<TribeRepository> _repo;

  public TribeRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<TribeRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateTribeFields_UpdatesExpectedFields()
  {
    var existingTribe = new Tribe()
    {
      Id = 1,
      Name = "Tribe Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Tribe()
    {
      Id = existingTribe.Id,
      Name = existingTribe.Name,
      Description = existingTribe.Description,
      DisbandedDate = existingTribe.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingTribe);
  }

  [Fact]
  public async Task UpdateTribeAsync_Updates_Fields()
  {
    var existingTribe = new Tribe()
    {
      Id = 1,
      Name = "Tribe Name",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingTribe);
    _repo.Setup(x => x.Update(It.IsAny<Tribe>()));
    var update = new Tribe()
    {
      Id = existingTribe.Id,
      Name = existingTribe.Name,
      Description = existingTribe.Description,
      DisbandedDate = existingTribe.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingTribe), Times.Once);
    _repo.Verify(x => x.Update(existingTribe), Times.Once);
  }
}