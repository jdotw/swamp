using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class HomeAssignmentRepository : RepositoryBase<HomeAssignment>, IHomeAssignmentRepository
{
  public HomeAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<HomeAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<HomeAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<HomeAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Team)
      .Include(p => p.Capability)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(HomeAssignment HomeAssignment)
  {
    await base.AddAsync(HomeAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(HomeAssignment update, HomeAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(HomeAssignment updatedHomeAssignment)
  {
    var dbHomeAssignment = await FindById(updatedHomeAssignment.Id);
    if (dbHomeAssignment is not null)
    {
      UpdateFields(updatedHomeAssignment, dbHomeAssignment);
      Update(dbHomeAssignment);
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
