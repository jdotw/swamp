using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class PersonRepositoryTests
{
  private readonly Mock<OrgDbContext> _context;
  private readonly Mock<PersonRepository> _repo;

  public PersonRepositoryTests()
  {
    _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
    _repo = new Mock<PersonRepository>(_context.Object) { CallBase = true, };
  }

  [Fact]
  public void UpdatePersonFields_UpdatesExpectedFields()
  {
    var existingPerson = new Person()
    {
      Id = 1,
      FirstName = "Original",
      LastName = "Name",
      MiddleNames = "Middle"
    };
    var update = new Person()
    {
      FirstName = "Changed",
      LastName = "Name",
      MiddleNames = "Also Middle"
    };
    _repo.Object.UpdateFields(update, existingPerson);
    Assert.Equal(update.FirstName, existingPerson.FirstName);
    Assert.Equal(update.MiddleNames, existingPerson.MiddleNames);
    Assert.Equal(update.LastName, existingPerson.LastName);
  }

  [Fact]
  public async Task UpdatePersonAsync_Updates_Fields()
  {
    var existingPerson = new Person()
    {
      Id = 1,
      FirstName = "Original",
      LastName = "Name",
      MiddleNames = "Middle"
    };
    _repo.Setup(x => x.FindById(It.IsAny<int>())).ReturnsAsync(existingPerson);
    _repo.Setup(x => x.Update(It.IsAny<Person>()));
    var update = new Person()
    {
      FirstName = "Changed",
      LastName = "Name",
      MiddleNames = "Also Middle"
    };
    var result = await _repo.Object.UpdateAsync(update);
    _repo.Verify(x => x.UpdateFields(update, existingPerson), Times.Once);
    _repo.Verify(x => x.Update(existingPerson), Times.Once);
  }
}