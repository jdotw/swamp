using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository;

public class TribeRoleTypeRepository : RepositoryBase<TribeRoleType>, ITribeRoleTypeRepository
{
  public TribeRoleTypeRepository(DeliveryDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<TribeRoleType>> GetAllAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<TribeRoleType?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(TribeRoleType type)
  {
    await base.AddAsync(type);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(TribeRoleType type)
  {
    var dbTribeRoleType = await GetAsync(type.Id);
    if (dbTribeRoleType is not null)
    {
      dbTribeRoleType.Name = type.Name;
      base.Update(dbTribeRoleType);
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