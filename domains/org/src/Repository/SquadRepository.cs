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

  public async Task<IEnumerable<Squad>> GetAllAsync(int tribeId, List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => s.TribeId == tribeId)
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Squad?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Squad?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Tribe)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Squad Squad)
  {
    await base.AddAsync(Squad);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Squad update, Squad existing)
  {
    base.UpdateFields(update, existing);
  }

  public async Task<int> UpdateAsync(Squad updatedSquad)
  {
    var dbSquad = await FindById(updatedSquad.Id);
    if (dbSquad is not null)
    {
      UpdateFields(updatedSquad, dbSquad);
      Update(dbSquad);
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