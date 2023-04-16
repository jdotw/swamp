
using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class DeploymentTypeRepository : RepositoryBase<DeploymentType>, IDeploymentTypeRepository
{
  public DeploymentTypeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<DeploymentType>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public virtual async Task<DeploymentType?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<DeploymentType?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Children)
      .Include(p => p.Parent)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(DeploymentType deploymentType)
  {
    await base.AddAsync(deploymentType);
    return await SaveAsync();
  }

  public virtual void UpdateFields(DeploymentType update, DeploymentType existing)
  {
    existing.Name = update.Name;
    existing.RetiredAtDate = update.RetiredAtDate;
  }

  public async Task<int> UpdateAsync(DeploymentType updatedDeploymentType)
  {
    var dbDeploymentType = await FindById(updatedDeploymentType.Id);
    if (dbDeploymentType is not null)
    {
      UpdateFields(updatedDeploymentType, dbDeploymentType);
      Update(dbDeploymentType);
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
