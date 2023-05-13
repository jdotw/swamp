using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;

namespace Org.UnitTests;

public class LevelRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<LevelRepository> _repo;

  public LevelRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<LevelRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateLevelFields_UpdatesExpectedFields()
  {
    var existingLevel = new Level()
    {
      Index = 2,
      ExternalId = "2-High",
      IndividualContributorTitle = "IC Title",
      ManagerTitle = "Manager Title",
      RetiredAtDate = DateTimeOffset.MinValue,
    };
    var update = new Level()
    {
      Index = 3,
      ExternalId = "3-Low",
      IndividualContributorTitle = "New IC Title",
      ManagerTitle = "New Manager Title",
      RetiredAtDate = DateTimeOffset.MaxValue,

    };
    _repo.Object.UpdateFields(update, existingLevel);
    existingLevel.Index.Should().Be(update.Index);
    existingLevel.ExternalId.Should().Be(update.ExternalId);
    existingLevel.IndividualContributorTitle.Should().Be(update.IndividualContributorTitle);
    existingLevel.ManagerTitle.Should().Be(update.ManagerTitle);
    existingLevel.RetiredAtDate.Should().Be(update.RetiredAtDate);
  }

  [Fact]
  public void UpdateLevelFields_DoesNotUpdatesUnexpectedFields()
  {
    var existingLevel = new Level()
    {
      ActiveFromDate = DateTimeOffset.MinValue,
    };
    var update = new Level()
    {
      ActiveFromDate = DateTimeOffset.Now,
    };
    _repo.Object.UpdateFields(update, existingLevel);
    existingLevel.ActiveFromDate.Should().NotBe(update.ActiveFromDate);
  }

  [Fact]
  public async Task UpdateAsync_Updates_Fields()
  {
    var existingLevel = new Level()
    {
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingLevel);
    _repo.Setup(x => x.Update(It.IsAny<Level>()));
    var update = new Level()
    {
      RetiredAtDate = DateTimeOffset.Now,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingLevel), Times.Once);
    _repo.Verify(x => x.Update(existingLevel), Times.Once);
  }

  [Fact]
  public async Task AddAsync_FailsWithNoTitles()
  {
    var level = new Level()
    {
      // No Titles specified
    };
    await Assert.ThrowsAsync<ArgumentException>(() => _repo.Object.AddAsync(level));
  }

  [Fact]
  public async Task AddAsync_FailsIfChildIndexDoesNotEqualParentIndex()
  {
    var existingLevel = new Level()
    {
      Index = 1,
      ManagerTitle = "Manager"
    };
    _repo.Setup(x => x.GetByIdAsync(It.IsAny<int>())).ReturnsAsync(existingLevel);
    var childLevel = new Level()
    {
      Index = 2,
      ManagerTitle = "Manager",
      ParentId = existingLevel.Id,
    };
    await Assert.ThrowsAsync<ArgumentException>(() => _repo.Object.AddAsync(childLevel));
  }
}
