
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class CapabilityTypeRepository : RepositoryBase<CapabilityType>, ICapabilityTypeRepository
{
  public CapabilityTypeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<CapabilityType>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .Include(p => p.RoleType)
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public virtual async Task<CapabilityType?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<CapabilityType?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Children)
      .Include(p => p.Parent)
      .Include(p => p.RoleType)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(CapabilityType capabilityType)
  {
    await base.AddAsync(capabilityType);
    return await SaveAsync();
  }

  public virtual void UpdateFields(CapabilityType update, CapabilityType existing)
  {
    existing.Name = update.Name;
    existing.ParentId = update.ParentId > 0 ? update.ParentId : null;
    existing.RoleTypeId = update.RoleTypeId > 0 ? update.RoleTypeId : null;
    existing.RetiredAtDate = update.RetiredAtDate;
  }

  public async Task<int> UpdateAsync(CapabilityType updatedCapabilityType)
  {
    var dbCapabilityType = await FindById(updatedCapabilityType.Id);
    if (dbCapabilityType is not null)
    {
      UpdateFields(updatedCapabilityType, dbCapabilityType);
      Update(dbCapabilityType);
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
