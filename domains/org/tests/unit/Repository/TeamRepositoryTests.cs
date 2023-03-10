using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class TeamRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<TeamRepository> _repo;

  public TeamRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<TeamRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateTeamFields_UpdatesExpectedFields()
  {
    var existingTeam = new Team()
    {
      Id = 1,
      Name = "Team Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Team()
    {
      Id = existingTeam.Id,
      Name = existingTeam.Name,
      Description = existingTeam.Description,
      DisbandedDate = existingTeam.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingTeam);
  }

  [Fact]
  public async Task UpdateTeamAsync_Updates_Fields()
  {
    var existingTeam = new Team()
    {
      Id = 1,
      Name = "Team Name",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingTeam);
    _repo.Setup(x => x.Update(It.IsAny<Team>()));
    var update = new Team()
    {
      Id = existingTeam.Id,
      Name = existingTeam.Name,
      Description = existingTeam.Description,
      DisbandedDate = existingTeam.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingTeam), Times.Once);
    _repo.Verify(x => x.Update(existingTeam), Times.Once);
  }
}