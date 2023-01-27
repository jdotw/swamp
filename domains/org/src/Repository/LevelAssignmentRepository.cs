using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class LevelAssignmentRepository : RepositoryBase<LevelAssignment>, ILevelAssignmentRepository
{
  public LevelAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<LevelAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<LevelAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<LevelAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Level)
      .Include(p => p.Role)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(LevelAssignment LevelAssignment)
  {
    await base.AddAsync(LevelAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(LevelAssignment update, LevelAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(LevelAssignment updatedLevelAssignment)
  {
    var dbLevelAssignment = await FindById(updatedLevelAssignment.Id);
    if (dbLevelAssignment is not null)
    {
      UpdateFields(updatedLevelAssignment, dbLevelAssignment);
      Update(dbLevelAssignment);
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