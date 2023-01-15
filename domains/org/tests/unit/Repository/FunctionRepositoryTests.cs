using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class FunctionRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<FunctionRepository> _repo;

  public FunctionRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<FunctionRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateFunctionFields_UpdatesExpectedFields()
  {
    var existingFunction = new Function()
    {
      Name = "Existing Name",
    };
    var update = new Function()
    {
      Name = "Updated Name",
    };
    _repo.Object.UpdateFunctionFields(update, existingFunction);
    Assert.Equal(update.Name, existingFunction.Name);
  }

  [Fact]
  public async Task UpdateFunctionAsync_Updates_Fields()
  {
    var existingFunction = new Function()
    {
      Name = "Existing Function",
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingFunction);
    _repo.Setup(x => x.Update(It.IsAny<Function>()));
    var update = new Function()
    {
      Name = "Updated Function Name",
    };
    var result = await _repo.Object.UpdateFunctionAsync(update);
    _repo.Verify(x => x.UpdateFunctionFields(update, existingFunction), Times.Once);
    _repo.Verify(x => x.Update(existingFunction), Times.Once);
  }
}