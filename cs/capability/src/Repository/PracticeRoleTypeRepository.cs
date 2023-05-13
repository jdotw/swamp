using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class PracticeRoleTypeRepository : RepositoryBase<PracticeRoleType>, IPracticeRoleTypeRepository
{
  public PracticeRoleTypeRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<PracticeRoleType>> GetAllAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<PracticeRoleType?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(PracticeRoleType type)
  {
    await base.AddAsync(type);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(PracticeRoleType type)
  {
    var dbPracticeRoleType = await GetAsync(type.Id);
    if (dbPracticeRoleType is not null)
    {
      dbPracticeRoleType.Name = type.Name;
      base.Update(dbPracticeRoleType);
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