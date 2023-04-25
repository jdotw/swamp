
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class CapabilitiesRepository : RepositoryBase<Capability>, ICapabilitiesRepository
{
  public CapabilitiesRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Capability>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .Include(p => p.HomeAssignments)
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<IEnumerable<Capability>> GetAllByRoleIdAsync(int roleId, bool activeOnly = false)
  {
    return await FindAllAsync()
        .Where(s => s.RoleId == roleId)
        .Where(s => !activeOnly || s.RetiredAtDate == null)
        .Include(p => p.CapabilityType)
        .Include(p => p.HomeAssignments)
        .ThenInclude(p => p.Team)
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public virtual async Task<Capability?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).AsNoTracking().FirstOrDefaultAsync();
  }

  public async Task<Capability?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.CapabilityType)
      .Include(p => p.Role)
      .Include(p => p.HomeAssignments)
      .AsSplitQuery()
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Capability capability)
  {
    await base.AddAsync(capability);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Capability update, Capability existing)
  {
    existing.RetiredAtDate = update.RetiredAtDate;
  }

  public async Task<int> UpdateAsync(Capability updatedCapability)
  {
    var dbCapability = await FindById(updatedCapability.Id);
    if (dbCapability is not null)
    {
      UpdateFields(updatedCapability, dbCapability);
      Update(dbCapability);
      return await SaveAsync();
    }
    else { return 0; }
  }

  // public async Task<int> DeleteAsync(int id)
  // {
  //   Delete(id);
  //   return await SaveAsync();
  // }
  //
}
