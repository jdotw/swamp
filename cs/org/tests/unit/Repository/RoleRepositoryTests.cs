using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;

namespace Org.UnitTests;

public class RoleRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<RoleRepository> _repo;

  public RoleRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<RoleRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateRoleFields_UpdatesExpectedFields()
  {
    var existingRole = new Role()
    {
      RoleTypeId = 1,
    };
    var update = new Role()
    {
      ClosedAtDate = DateTimeOffset.Now,
    };
    _repo.Object.UpdateFields(update, existingRole);
    Assert.Equal(existingRole.ClosedAtDate, update.ClosedAtDate);
  }

  [Fact]
  public void UpdateRoleFields_DoesNotUpdatesUnexpectedFields()
  {
    var existingRole = new Role()
    {
      RoleTypeId = 1,
      OpenFromDate = DateTimeOffset.MinValue,
    };
    var update = new Role()
    {
      RoleTypeId = 34,
      OpenFromDate = DateTimeOffset.Now,
    };
    _repo.Object.UpdateFields(update, existingRole);
    existingRole.RoleTypeId.Should().NotBe(update.RoleTypeId);
    existingRole.OpenFromDate.Should().NotBe(update.OpenFromDate);
  }

  [Fact]
  public async Task UpdateRoleAsync_Updates_Fields()
  {
    var existingRole = new Role()
    {
      RoleTypeId = 1,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingRole);
    _repo.Setup(x => x.Update(It.IsAny<Role>()));
    var update = new Role()
    {
      RoleTypeId = 1,
      OpenFromDate = DateTimeOffset.Now,
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingRole), Times.Once);
    _repo.Verify(x => x.Update(existingRole), Times.Once);
  }
}