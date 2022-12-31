using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class SquadRepository : RepositoryBase<Squad>, ISquadRepository
{
  public SquadRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Squad>> GetAllSquadsAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<Squad?> GetSquadByIdAsync(int id)
  {
    return await FindByConditionAsync(s => s.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Squad?> GetSquadWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(s => s.Id.Equals(id))
        .Include(s => s.SquadRoles)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddSquadAsync(Squad squad)
  {
    await AddAsync(squad);
    return await SaveAsync();
  }

  public async Task<int> UpdateSquadAsync(Squad updatedSquad)
  {
    var dbSquad = await GetSquadByIdAsync(updatedSquad.Id);
    if (dbSquad is not null)
    {
      dbSquad.Name = updatedSquad.Name;
      if (updatedSquad.DisbandedDate is not null)
        dbSquad.DisbandedDate = updatedSquad.DisbandedDate;
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