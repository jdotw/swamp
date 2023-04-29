using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class ManagerAssignmentRepository : RepositoryBase<ManagerAssignment>, IManagerAssignmentRepository
{
  public ManagerAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<ManagerAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .OrderBy(s => s.Id)
      .ToListAsync();
  }

  public async Task<IEnumerable<ManagerAssignment>> GetAllByRoleIdAsync(int roleId)
  {
    return await FindAllAsync()
      .Where(s => s.RoleId == roleId)
      .Include(p => p.Manager)
      .ThenInclude(p => p.RoleAssignments)
      .ThenInclude(p => p.Person)
      .AsSplitQuery()
      .OrderBy(s => s.Id)
      .ToListAsync();
  }

  public async Task<ManagerAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<ManagerAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Role)
      .Include(p => p.Manager)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(ManagerAssignment ManagerAssignment)
  {
    // Fetch all manager assignment for the role that have a null end date
    // and set the end date to now 
    var existingManagerAssignments = await FindAllAsync()
      .Where(p => p.RoleId == ManagerAssignment.RoleId && p.EndDate == null)
      .ToListAsync();
    foreach (var existingManagerAssignment in existingManagerAssignments)
    {
      existingManagerAssignment.EndDate = DateTimeOffset.UtcNow;
      Update(existingManagerAssignment);
    }
    await base.AddAsync(ManagerAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(ManagerAssignment update, ManagerAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(ManagerAssignment updatedManagerAssignment)
  {
    var dbManagerAssignment = await FindById(updatedManagerAssignment.Id);
    if (dbManagerAssignment is not null)
    {
      UpdateFields(updatedManagerAssignment, dbManagerAssignment);
      Update(dbManagerAssignment);
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
