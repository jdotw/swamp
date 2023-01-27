using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class ChapterRepository : UnitRepository<Chapter>, IChapterRepository
{
  public ChapterRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Chapter>> GetAllAsync(int practiceId, List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => s.PracticeId == practiceId)
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Chapter?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Chapter?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.UnitAssignments)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Chapter Chapter)
  {
    await base.AddAsync(Chapter);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Chapter update, Chapter existing)
  {
    base.UpdateFields(update, existing);
  }

  public async Task<int> UpdateAsync(Chapter updatedChapter)
  {
    var dbChapter = await FindById(updatedChapter.Id);
    if (dbChapter is not null)
    {
      UpdateFields(updatedChapter, dbChapter);
      Update(dbChapter);
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