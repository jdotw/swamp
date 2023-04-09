using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class LevelRepository : RepositoryBase<Level>, ILevelRepository
{
  public LevelRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Level>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Level?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Level?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.LevelAssignments)
      .Include(p => p.Children)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Level Level)
  {
    await base.AddAsync(Level);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Level update, Level existing)
  {
    existing.Index = update.Index;
    existing.ExternalId = update.ExternalId;
    existing.ManagerTitle = update.ManagerTitle;
    existing.IndividualContributorTitle = update.IndividualContributorTitle;
    existing.RetiredAtDate = update.RetiredAtDate;
  }

  public async Task<int> UpdateAsync(Level updatedLevel)
  {
    var dbLevel = await FindById(updatedLevel.Id);
    if (dbLevel is not null)
    {
      UpdateFields(updatedLevel, dbLevel);
      Update(dbLevel);
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
