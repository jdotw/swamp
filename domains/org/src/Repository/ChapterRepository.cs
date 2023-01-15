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

  public async Task<IEnumerable<Chapter>> GetAllChaptersAsync(int practiceId, List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => s.PracticeId == practiceId)
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Chapter?> GetChapterByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Chapter?> GetChapterWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddChapterAsync(Chapter Chapter)
  {
    await AddAsync(Chapter);
    return await SaveAsync();
  }

  public virtual void UpdateChapterFields(Chapter update, Chapter existing)
  {
    base.UpdateUnitFields(update, existing);
  }

  public async Task<int> UpdateChapterAsync(Chapter updatedChapter)
  {
    var dbChapter = await FindById(updatedChapter.Id);
    if (dbChapter is not null)
    {
      UpdateChapterFields(updatedChapter, dbChapter);
      Update(dbChapter);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteChapterAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}