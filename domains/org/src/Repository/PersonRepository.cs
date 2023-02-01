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

  public async Task<IEnumerable<Person>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(p => filterIds == null || filterIds.Contains(p.Id))
        .Include(p => p.RoleAssignments.Where(r => r.EndDate == null))
        .ThenInclude(r => r.Role)
        .ThenInclude(r => r.LevelAssignments)
        .Include(p => p.RoleAssignments.Where(r => r.EndDate == null))
        .ThenInclude(r => r.Role)
        .ThenInclude(r => r.UnitAssignments)
        .ThenInclude(u => u.Unit)
        .OrderBy(p => p.Id)
        .ToListAsync();
  }

  public async Task<Person?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Person?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.RoleAssignments)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Person Person)
  {
    await base.AddAsync(Person);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Person update, Person existing)
  {
    existing.FirstName = update.FirstName;
    existing.MiddleNames = update.MiddleNames;
    existing.LastName = update.LastName;
  }

  public async Task<int> UpdateAsync(Person updatedPerson)
  {
    var dbPerson = await FindById(updatedPerson.Id);
    if (dbPerson is not null)
    {
      UpdateFields(updatedPerson, dbPerson);
      Update(dbPerson);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}