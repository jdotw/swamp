using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class FunctionTypeRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<FunctionTypeRepository> _repo;

  public FunctionTypeRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<FunctionTypeRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateFunctionTypeFields_UpdatesExpectedFields()
  {
    var existingFunctionType = new FunctionType()
    {
      Id = 1,
      Name = "Existing Function Type"
    };
    var update = new FunctionType()
    {
      Name = "Updated Name"
    };
    _repo.Object.UpdateFunctionTypeFields(update, existingFunctionType);
    Assert.Equal(update.Name, existingFunctionType.Name);
  }

  [Fact]
  public async Task UpdateFunctionTypeAsync_Updates_Fields()
  {
    var existingFunctionType = new FunctionType()
    {
      Id = 1,
      Name = "Existing Function Type"
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingFunctionType);
    _repo.Setup(x => x.Update(It.IsAny<FunctionType>()));
    var update = new FunctionType()
    {
      Name = "Updated Name"
    };
    var result = await _repo.Object.UpdateFunctionTypeAsync(update);
    _repo.Verify(x => x.UpdateFunctionTypeFields(update, existingFunctionType), Times.Once);
    _repo.Verify(x => x.Update(existingFunctionType), Times.Once);
  }
}