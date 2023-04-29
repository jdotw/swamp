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
