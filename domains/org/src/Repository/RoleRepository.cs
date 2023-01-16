using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class RoleRepository : RepositoryBase<Role>, IRoleRepository
{
  public RoleRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Role>> GetAllRolesAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Role?> GetRoleByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Role?> GetRoleWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      // .Include(p => p.Person)
      // .Include(p => p.RoleType)
      // .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddRoleAsync(Role Role)
  {
    await AddAsync(Role);
    return await SaveAsync();
  }

  public virtual void UpdateRoleFields(Role update, Role existing)
  {
    existing.RoleTypeId = update.RoleTypeId;
    existing.Title = update.Title;
  }

  public async Task<int> UpdateRoleAsync(Role updatedRole)
  {
    var dbRole = await FindById(updatedRole.Id);
    if (dbRole is not null)
    {
      UpdateRoleFields(updatedRole, dbRole);
      Update(dbRole);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteRoleAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}