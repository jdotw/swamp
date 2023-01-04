using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class PracticeRoleRepository : RepositoryBase<PracticeRole>, IPracticeRoleRepository
{
  public PracticeRoleRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<PracticeRole>> GetAllAsync(int practiceId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.PracticeId == practiceId)
      .Include(r => r.PracticeRoleType)
      .Include(r => r.Practice)
      // .OrderBy(s => s.Name)
      .ToListAsync();
  }

  public async Task<IEnumerable<PracticeRole>> GetAllByIndividualIdAsync(int individualId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.IndividualId == individualId)
      .Include(r => r.PracticeRoleType)
      .Include(r => r.Practice)
      .ToListAsync();
  }

  public async Task<PracticeRole?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public async Task<PracticeRole?> GetDetailsAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .Include(r => r.PracticeRoleType)
      .Include(r => r.Practice)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(PracticeRole role)
  {
    await base.AddAsync(role);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(PracticeRole role)
  {
    var dbPracticeRole = await GetAsync(role.Id);
    if (dbPracticeRole is not null)
    {
      dbPracticeRole.StartDate = role.StartDate;
      dbPracticeRole.EndDate = role.EndDate;
      base.Update(dbPracticeRole);
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