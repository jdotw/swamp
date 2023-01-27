using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class RoleTypeRepository : RepositoryBase<RoleType>, IRoleTypeRepository
{
  public RoleTypeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<RoleType>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<RoleType?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<RoleType?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Roles)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(RoleType RoleType)
  {
    await base.AddAsync(RoleType);
    return await SaveAsync();
  }

  public virtual void UpdateFields(RoleType update, RoleType existing)
  {
    existing.Title = update.Title;
  }

  public async Task<int> UpdateAsync(RoleType updatedRoleType)
  {
    var dbRoleType = await FindById(updatedRoleType.Id);
    if (dbRoleType is not null)
    {
      UpdateFields(updatedRoleType, dbRoleType);
      Update(dbRoleType);
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