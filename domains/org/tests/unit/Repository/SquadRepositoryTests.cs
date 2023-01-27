using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class SquadRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<SquadRepository> _repo;

  public SquadRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<SquadRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateSquadFields_UpdatesExpectedFields()
  {
    var existingSquad = new Squad()
    {
      Id = 1,
      Name = "Squad Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Squad()
    {
      Id = existingSquad.Id,
      Name = existingSquad.Name,
      Description = existingSquad.Description,
      DisbandedDate = existingSquad.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingSquad);
  }

  [Fact]
  public async Task UpdateSquadAsync_Updates_Fields()
  {
    var existingSquad = new Squad()
    {
      Id = 1,
      Name = "Squad Name",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingSquad);
    _repo.Setup(x => x.Update(It.IsAny<Squad>()));
    var update = new Squad()
    {
      Id = existingSquad.Id,
      Name = existingSquad.Name,
      Description = existingSquad.Description,
      DisbandedDate = existingSquad.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingSquad), Times.Once);
    _repo.Verify(x => x.Update(existingSquad), Times.Once);
  }
}