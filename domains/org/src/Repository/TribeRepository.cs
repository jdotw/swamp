using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class TribeRepository : UnitRepository<Tribe>, ITribeRepository
{
  public TribeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Tribe>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Tribe?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Tribe?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Squads)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Tribe Tribe)
  {
    await base.AddAsync(Tribe);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Tribe update, Tribe existing)
  {
    base.UpdateFields(update, existing);
  }

  public async Task<int> UpdateAsync(Tribe updatedTribe)
  {
    var dbTribe = await FindById(updatedTribe.Id);
    if (dbTribe is not null)
    {
      UpdateFields(updatedTribe, dbTribe);
      Update(dbTribe);
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