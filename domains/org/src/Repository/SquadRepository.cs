using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class SquadRepository : UnitRepository<Squad>, ISquadRepository
{
  public SquadRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Squad>> GetAllSquadsAsync(int tribeId, List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => s.TribeId == tribeId)
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Squad?> GetSquadByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Squad?> GetSquadWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddSquadAsync(Squad Squad)
  {
    await AddAsync(Squad);
    return await SaveAsync();
  }

  public virtual void UpdateSquadFields(Squad update, Squad existing)
  {
    base.UpdateUnitFields(update, existing);
  }

  public async Task<int> UpdateSquadAsync(Squad updatedSquad)
  {
    var dbSquad = await FindById(updatedSquad.Id);
    if (dbSquad is not null)
    {
      UpdateSquadFields(updatedSquad, dbSquad);
      Update(dbSquad);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteSquadAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}