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
      Type = "delivery",
      Name = "Team Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Team()
    {
      Id = existingTeam.Id,
      Type = existingTeam.Type,
      Name = "New Name",
      Description = "New Description",
      DisbandedDate = DateTimeOffset.MaxValue,
      ParentId = 100,
    };
    _repo.Object.UpdateFields(update, existingTeam);
    Assert.Equal(update.Name, existingTeam.Name);
    Assert.Equal(update.Description, existingTeam.Description);
    Assert.Equal(update.DisbandedDate, existingTeam.DisbandedDate);
    Assert.Equal(update.ParentId, existingTeam.ParentId);
  }

  [Fact]
  public void UpdateTeamFields_DoesNotUpdateExpectedFields()
  {
    var ExpectedId = 1;
    var ExpectedType = "delivery";
    var existingTeam = new Team()
    {
      Id = ExpectedId,
      Type = ExpectedType,
      Name = "Team Name",
      Description = "Description",
      DisbandedDate = null,
    };
    var update = new Team()
    {
      Id = 100000, // Should not change
      Type = "NOTdelivery", // should not change
      Name = existingTeam.Name,
      Description = existingTeam.Description,
      DisbandedDate = existingTeam.DisbandedDate,
    };
    _repo.Object.UpdateFields(update, existingTeam);
    Assert.Equal(ExpectedId, existingTeam.Id);
    Assert.Equal(ExpectedType, existingTeam.Type);
  }

  [Fact]
  public async Task UpdateTeamAsync_Updates_Fields()
  {
    var existingTeam = new Team()
    {
      Id = 1,
      Name = "Team Name",
      Type = "delivery",
      Description = "Description",
      DisbandedDate = null,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingTeam);
    _repo.Setup(x => x.Update(It.IsAny<Team>()));
    var update = new Team()
    {
      Id = existingTeam.Id,
      Name = existingTeam.Name,
      Type = "delivery",
      Description = existingTeam.Description,
      DisbandedDate = existingTeam.DisbandedDate,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingTeam), Times.Once);
    _repo.Verify(x => x.Update(existingTeam), Times.Once);
  }
}
