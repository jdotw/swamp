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

  public async Task<IEnumerable<RoleType>> GetAllRoleTypesAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<RoleType?> GetRoleTypeByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<RoleType?> GetRoleTypeWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Roles)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddRoleTypeAsync(RoleType RoleType)
  {
    await AddAsync(RoleType);
    return await SaveAsync();
  }

  public virtual void UpdateRoleTypeFields(RoleType update, RoleType existing)
  {
    existing.Title = update.Title;
  }

  public async Task<int> UpdateRoleTypeAsync(RoleType updatedRoleType)
  {
    var dbRoleType = await FindById(updatedRoleType.Id);
    if (dbRoleType is not null)
    {
      UpdateRoleTypeFields(updatedRoleType, dbRoleType);
      Update(dbRoleType);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteRoleTypeAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}