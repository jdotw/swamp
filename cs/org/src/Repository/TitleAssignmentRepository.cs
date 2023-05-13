using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class TitleAssignmentRepository : RepositoryBase<TitleAssignment>, ITitleAssignmentRepository
{
  public TitleAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<TitleAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<TitleAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<TitleAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Title)
      .Include(p => p.Role)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(TitleAssignment TitleAssignment)
  {
    await base.AddAsync(TitleAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(TitleAssignment update, TitleAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(TitleAssignment updatedTitleAssignment)
  {
    var dbTitleAssignment = await FindById(updatedTitleAssignment.Id);
    if (dbTitleAssignment is not null)
    {
      UpdateFields(updatedTitleAssignment, dbTitleAssignment);
      Update(dbTitleAssignment);
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
