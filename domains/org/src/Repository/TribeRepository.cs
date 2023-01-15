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

  public async Task<IEnumerable<Tribe>> GetAllTribesAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Tribe?> GetTribeByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Tribe?> GetTribeWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddTribeAsync(Tribe Tribe)
  {
    await AddAsync(Tribe);
    return await SaveAsync();
  }

  public virtual void UpdateTribeFields(Tribe update, Tribe existing)
  {
    base.UpdateUnitFields(update, existing);
  }

  public async Task<int> UpdateTribeAsync(Tribe updatedTribe)
  {
    var dbTribe = await FindById(updatedTribe.Id);
    if (dbTribe is not null)
    {
      UpdateTribeFields(updatedTribe, dbTribe);
      Update(dbTribe);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteTribeAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}