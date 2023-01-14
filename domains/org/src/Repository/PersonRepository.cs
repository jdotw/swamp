using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class PersonRepository : RepositoryBase<Person>, IPersonRepository
{
  public PersonRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Person>> GetAllPersonsAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Person?> GetPersonByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Person?> GetPersonWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Roles)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddPersonAsync(Person Person)
  {
    await AddAsync(Person);
    return await SaveAsync();
  }

  public virtual void UpdatePersonFields(Person update, Person existing)
  {
    existing.FirstName = update.FirstName;
    existing.MiddleNames = update.MiddleNames;
    existing.LastName = update.LastName;
  }

  public async Task<int> UpdatePersonAsync(Person updatedPerson)
  {
    var dbPerson = await FindById(updatedPerson.Id);
    if (dbPerson is not null)
    {
      UpdatePersonFields(updatedPerson, dbPerson);
      Update(dbPerson);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeletePersonAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}