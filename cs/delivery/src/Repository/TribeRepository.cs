using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class TribeRepository : RepositoryBase<Tribe>, ITribeRepository
{
  public TribeRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Tribe>> GetAllTribesAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<Tribe?> GetTribeByIdAsync(int tribeId)
  {
    return await FindByConditionAsync(tribe => tribe.Id.Equals(tribeId)).FirstOrDefaultAsync();
  }

  public async Task<Tribe?> GetTribeWithDetailsAsync(int tribeId)
  {
    return await FindByConditionAsync(tribe => tribe.Id.Equals(tribeId))
        .Include(s => s.TribeRoles)
        .Include(s => s.Squads)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddTribeAsync(Tribe tribe)
  {
    await AddAsync(tribe);
    return await SaveAsync();
  }

  public async Task<int> UpdateTribeAsync(Tribe updatedTribe)
  {
    var dbTribe = await GetTribeByIdAsync(updatedTribe.Id);
    if (dbTribe is not null)
    {
      dbTribe.Name = updatedTribe.Name;
      if (updatedTribe.DisbandedDate is not null)
        dbTribe.DisbandedDate = updatedTribe.DisbandedDate;
      Update(dbTribe);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteTribeAsync(int tribeId)
  {
    Delete(tribeId);
    return await SaveAsync();
  }
}