using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class DeploymentRepository : RepositoryBase<Deployment>, IDeploymentRepository
{
  public DeploymentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Deployment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Deployment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Deployment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Team)
      .Include(p => p.Capability)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Deployment Deployment)
  {
    await base.AddAsync(Deployment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Deployment update, Deployment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(Deployment updatedDeployment)
  {
    var dbDeployment = await FindById(updatedDeployment.Id);
    if (dbDeployment is not null)
    {
      UpdateFields(updatedDeployment, dbDeployment);
      Update(dbDeployment);
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
