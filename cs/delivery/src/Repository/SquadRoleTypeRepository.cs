using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class SquadRoleTypeRepository : RepositoryBase<SquadRoleType>, ISquadRoleTypeRepository
{
  public SquadRoleTypeRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<SquadRoleType>> GetAllAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<SquadRoleType?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(SquadRoleType type)
  {
    await base.AddAsync(type);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(SquadRoleType type)
  {
    var dbSquadRoleType = await GetAsync(type.Id);
    if (dbSquadRoleType is not null)
    {
      dbSquadRoleType.Name = type.Name;
      base.Update(dbSquadRoleType);
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