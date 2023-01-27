using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class PracticeRepository : UnitRepository<Practice>, IPracticeRepository
{
  public PracticeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Practice>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Practice?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Practice?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Chapters)
      .Include(p => p.UnitAssignments)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Practice Practice)
  {
    await base.AddAsync(Practice);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Practice update, Practice existing)
  {
    base.UpdateFields(update, existing);
  }

  public async Task<int> UpdateAsync(Practice updatedPractice)
  {
    var dbPractice = await FindById(updatedPractice.Id);
    if (dbPractice is not null)
    {
      UpdateFields(updatedPractice, dbPractice);
      Update(dbPractice);
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