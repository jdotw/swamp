using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class RoleAssignmentRepository : RepositoryBase<RoleAssignment>, IRoleAssignmentRepository
{
  public RoleAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<RoleAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .OrderBy(s => s.Id)
      .Include(p => p.Person)
      .Include(p => p.Role)
      .ThenInclude(r => r.TitleAssignments)
      .AsSplitQuery()
      .ToListAsync();
  }

  public async Task<IEnumerable<RoleAssignment>> GetAllAsync(int personId)
  {
    return await FindAllAsync()
      .Where(s => s.PersonId == personId)
      .OrderBy(s => s.Id)
      .Include(p => p.Role)
      .ThenInclude(r => r.RoleType)
      .Include(p => p.Role)
      .ThenInclude(r => r.TitleAssignments)
      .ThenInclude(r => r.Title)
      .Include(p => p.Role)
      .ThenInclude(r => r.ManagerAssignments)
      .ThenInclude(r => r.Manager)
      .ThenInclude(r => r.RoleAssignments)
      .ThenInclude(r => r.Person)
      .Include(p => p.Role)
      .ThenInclude(r => r.Capabilities)
      .ThenInclude(c => c.CapabilityType)
      .Include(p => p.Role)
      .ThenInclude(r => r.Capabilities)
      .ThenInclude(c => c.HomeAssignments)
      .Include(p => p.Role)
      .ThenInclude(r => r.Capabilities)
      .ThenInclude(c => c.Deployments)
      .AsSplitQuery()
      .ToListAsync();
  }

  public async Task<IEnumerable<RoleAssignment>> GetAllByRoleIdAsync(int roleId)
  {
    return await FindAllAsync()
      .Where(s => s.RoleId == roleId)
      .OrderBy(s => s.Id)
      .Include(p => p.Person)
      .Include(p => p.Role)
      .ThenInclude(r => r.TitleAssignments)
      .AsSplitQuery()
      .ToListAsync();
  }

  public async Task<RoleAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Person)
      .Include(p => p.Role)
      .ThenInclude(r => r.TitleAssignments)
      .FirstOrDefaultAsync();
  }

  public async Task<RoleAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Person)
      .Include(p => p.Role)
      .ThenInclude(r => r.TitleAssignments)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(RoleAssignment RoleAssignment)
  {
    await base.AddAsync(RoleAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(RoleAssignment update, RoleAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(RoleAssignment updatedRoleAssignment)
  {
    var dbRoleAssignment = await FindById(updatedRoleAssignment.Id);
    if (dbRoleAssignment is not null)
    {
      UpdateFields(updatedRoleAssignment, dbRoleAssignment);
      Update(dbRoleAssignment);
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
