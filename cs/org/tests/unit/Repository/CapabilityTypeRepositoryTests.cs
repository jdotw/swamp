using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;

namespace Org.UnitTests;

public class CapabilityTypeRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<CapabilityTypeRepository> _repo;

  public CapabilityTypeRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<CapabilityTypeRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateCapabilityTypeFields_UpdatesExpectedFields()
  {
    var existingCapabilityType = new CapabilityType()
    {
      Name = "Old Name",
      ParentId = 5,
      RoleTypeId = 1,
      RetiredAtDate = DateTimeOffset.MinValue,
    };
    var update = new CapabilityType()
    {
      Name = "New Name",
      ParentId = 6,
      RoleTypeId = 2,
      RetiredAtDate = DateTimeOffset.MaxValue,

    };
    _repo.Object.UpdateFields(update, existingCapabilityType);
    existingCapabilityType.Name.Should().Be(update.Name);
    existingCapabilityType.ParentId.Should().Be(update.ParentId);
    existingCapabilityType.RoleTypeId.Should().Be(update.RoleTypeId);
    existingCapabilityType.RetiredAtDate.Should().Be(update.RetiredAtDate);
  }

  [Fact]
  public void UpdateCapabilityTypeFields_DoesNotUpdatesUnexpectedFields()
  {
    var existingCapabilityType = new CapabilityType()
    {
      Name = "Old Name",
      ActiveFromDate = DateTimeOffset.MinValue,
    };
    var update = new CapabilityType()
    {
      Name = "Old Name",
      ActiveFromDate = DateTimeOffset.Now,
    };
    _repo.Object.UpdateFields(update, existingCapabilityType);
    existingCapabilityType.ActiveFromDate.Should().NotBe(update.ActiveFromDate);
  }

  [Fact]
  public void UpdateCapabilityTypeFields_HandlesZeroParentId()
  {
    var existingCapabilityType = new CapabilityType()
    {
      Name = "Old Name",
      ParentId = 5,
      RoleTypeId = 1,
      RetiredAtDate = DateTimeOffset.MinValue,
    };
    var update = new CapabilityType()
    {
      Name = "New Name",
      ParentId = 0,
      RoleTypeId = 2,
      RetiredAtDate = DateTimeOffset.MaxValue,

    };
    _repo.Object.UpdateFields(update, existingCapabilityType);
    existingCapabilityType.ParentId.Should().BeNull();
  }

  [Fact]
  public void UpdateCapabilityTypeFields_HandlesZeroRoleTypeId()
  {
    var existingCapabilityType = new CapabilityType()
    {
      Name = "Old Name",
      ParentId = 5,
      RoleTypeId = 1,
      RetiredAtDate = DateTimeOffset.MinValue,
    };
    var update = new CapabilityType()
    {
      Name = "New Name",
      ParentId = 5,
      RoleTypeId = 0,
      RetiredAtDate = DateTimeOffset.MaxValue,

    };
    _repo.Object.UpdateFields(update, existingCapabilityType);
    existingCapabilityType.RoleTypeId.Should().BeNull();
  }

  [Fact]
  public async Task UpdateAsync_Calls_UpdateFields()
  {
    var existingCapabilityType = new CapabilityType()
    {
      Name = "I Dislike This Framework"
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingCapabilityType);
    _repo.Setup(x => x.Update(It.IsAny<CapabilityType>()));
    var update = new CapabilityType()
    {
      Name = "I Still Dislike This Framework",
      RetiredAtDate = DateTimeOffset.Now,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingCapabilityType), Times.Once);
    _repo.Verify(x => x.Update(existingCapabilityType), Times.Once);
  }

}
