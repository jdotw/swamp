using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class TribeRoleRepository : RepositoryBase<TribeRole>, ITribeRoleRepository
{
  public TribeRoleRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<TribeRole>> GetAllAsync(int tribeId, List<int>? individualIds = null)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.TribeId == tribeId
        && (individualIds == null || individualIds.Contains(r.IndividualId)))
      .Include(r => r.TribeRoleType)
      .Include(r => r.Tribe)
      // .OrderBy(s => s.Name)
      .ToListAsync();
  }

  public async Task<IEnumerable<TribeRole>> GetAllByIndividualIdAsync(int individualId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.IndividualId == individualId)
      .Include(r => r.TribeRoleType)
      .Include(r => r.Tribe)
      .ToListAsync();
  }

  public async Task<TribeRole?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public async Task<TribeRole?> GetDetailsAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .Include(r => r.TribeRoleType)
      .Include(r => r.Tribe)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(TribeRole role)
  {
    await base.AddAsync(role);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(TribeRole role)
  {
    var dbTribeRole = await GetAsync(role.Id);
    if (dbTribeRole is not null)
    {
      dbTribeRole.StartDate = role.StartDate;
      dbTribeRole.EndDate = role.EndDate;
      base.Update(dbTribeRole);
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