using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Repository;

public class SquadRepository : RepositoryBase<Squad>, ISquadRepository
{
  public SquadRepository(DeliveryContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Squad>> GetAllSquadsAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<Squad?> GetSquadByIdAsync(int squadId)
  {
    return await FindByConditionAsync(squad => squad.Id.Equals(squadId)).FirstOrDefaultAsync();
  }

  public async Task<Squad?> GetSquadWithDetailsAsync(int squadId)
  {
    return await FindByConditionAsync(squad => squad.Id.Equals(squadId))
        .Include(s => s.SquadRoles)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddSquadAsync(Squad squad)
  {
    await AddAsync(squad);
    return await SaveAsync();
  }

  public async Task<int> UpdateSquadAsync(Squad squad)
  {
    var dbSquad = await GetSquadByIdAsync(squad.Id);
    if (dbSquad is not null)
    {
      dbSquad.Name = squad.Name;
      Update(dbSquad);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteSquadAsync(int squadId)
  {
    Delete(squadId);
    return await SaveAsync();
  }
}