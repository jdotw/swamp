using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class FakeUnit : Unit
{

}

public class UnitRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<UnitRepository<FakeUnit>> _repo;

  public UnitRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<UnitRepository<FakeUnit>>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdateUnitFields_UpdatesExpectedFields()
  {
    var existingUnit = new FakeUnit()
    {
      Id = 1,
      Name = "Name",
      Description = "Description",
      DisbandedDate = null,
      FormedDate = DateTimeOffset.UtcNow,
    };
    var update = new FakeUnit()
    {
      Id = 1,
      Name = "New Name",
      Description = "New Description",
      DisbandedDate = DateTimeOffset.Now,
      FormedDate = DateTimeOffset.UtcNow,
    };
    _repo.Object.UpdateFields(update, existingUnit);
    Assert.Equal(update.Name, existingUnit.Name);
    Assert.Equal(update.Description, existingUnit.Description);
    Assert.Equal(update.DisbandedDate, existingUnit.DisbandedDate);
  }
}