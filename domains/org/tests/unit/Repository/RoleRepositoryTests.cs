using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

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
      Title = "Existing Role",
      PersonId = 1,
    };
    var update = new Role()
    {
      RoleTypeId = 34,
      Title = "Updated Role Title",
    };
    _repo.Object.UpdateRoleFields(update, existingRole);
    Assert.Equal(update.RoleTypeId, existingRole.RoleTypeId);
    Assert.Equal(update.Title, existingRole.Title);
    Assert.Equal(existingRole.PersonId, existingRole.PersonId);
  }

  [Fact]
  public void UpdateRoleFields_DoesNotUpdatesUnexpectedFields()
  {
    var existingRole = new Role()
    {
      RoleTypeId = 1,
      Title = "Existing Role",
      PersonId = 1,
    };
    var update = new Role()
    {
      RoleTypeId = 34,
      Title = "Updated Role Title",
      PersonId = 14324, // NOT Updatable!
    };
    _repo.Object.UpdateRoleFields(update, existingRole);
    Assert.Equal(update.RoleTypeId, existingRole.RoleTypeId);
    Assert.Equal(update.Title, existingRole.Title);
    Assert.Equal(existingRole.PersonId, existingRole.PersonId);
  }

  [Fact]
  public async Task UpdateRoleAsync_Updates_Fields()
  {
    var existingRole = new Role()
    {
      RoleTypeId = 1,
      Title = "Existing Role",
      PersonId = 1,
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingRole);
    _repo.Setup(x => x.Update(It.IsAny<Role>()));
    var update = new Role()
    {
      RoleTypeId = 34,
      Title = "Updated Role Title",
      PersonId = 14324, // NOT Updatable!
    };
    var result = await _repo.Object.UpdateRoleAsync(update);
    _repo.Verify(x => x.UpdateRoleFields(update, existingRole), Times.Once);
    _repo.Verify(x => x.Update(existingRole), Times.Once);
  }
}