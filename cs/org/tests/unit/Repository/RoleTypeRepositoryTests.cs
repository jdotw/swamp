using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class RoleTypeRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<RoleTypeRepository> _repo;

  public RoleTypeRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<RoleTypeRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateRoleTypeFields_UpdatesExpectedFields()
  {
    var existingRoleType = new RoleType()
    {
      Id = 1,
      Name = "Existing Role Type"
    };
    var update = new RoleType()
    {
      Name = "Updated Name"
    };
    _repo.Object.UpdateFields(update, existingRoleType);
    Assert.Equal(update.Name, existingRoleType.Name);
  }

  [Fact]
  public async Task UpdateRoleTypeAsync_Updates_Fields()
  {
    var existingRoleType = new RoleType()
    {
      Id = 1,
      Name = "Existing Role Type"
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingRoleType);
    _repo.Setup(x => x.Update(It.IsAny<RoleType>()));
    var update = new RoleType()
    {
      Name = "Updated Name"
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingRoleType), Times.Once);
    _repo.Verify(x => x.Update(existingRoleType), Times.Once);
  }
}
