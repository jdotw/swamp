using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class SquadRoleRepository : RepositoryBase<SquadRole>, ISquadRoleRepository
{
  public SquadRoleRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<SquadRole>> GetAllAsync(int squadId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.SquadId == squadId)
      .Include(r => r.SquadRoleType)
      .Include(r => r.Squad)
      // .OrderBy(s => s.Name)
      .ToListAsync();
  }

  public async Task<IEnumerable<SquadRole>> GetAllByIndividualIdAsync(int individualId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.IndividualId == individualId)
      .Include(r => r.SquadRoleType)
      .Include(r => r.Squad)
      .ToListAsync();
  }

  public async Task<SquadRole?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public async Task<SquadRole?> GetDetailsAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .Include(r => r.SquadRoleType)
      .Include(r => r.Squad)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(SquadRole role)
  {
    await base.AddAsync(role);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(SquadRole role)
  {
    var dbSquadRole = await GetAsync(role.Id);
    if (dbSquadRole is not null)
    {
      dbSquadRole.StartDate = role.StartDate;
      dbSquadRole.EndDate = role.EndDate;
      base.Update(dbSquadRole);
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