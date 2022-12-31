using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class ChapterRepository : RepositoryBase<Chapter>, IChapterRepository
{
  public ChapterRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Chapter>> GetAllChaptersAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<Chapter?> GetChapterByIdAsync(int id)
  {
    return await FindByConditionAsync(c => c.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Chapter?> GetChapterWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(c => c.Id.Equals(id))
        .Include(c => c.ChapterRoles)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddChapterAsync(Chapter chapter)
  {
    await AddAsync(chapter);
    return await SaveAsync();
  }

  public async Task<int> UpdateChapterAsync(Chapter updatedChapter)
  {
    var dbChapter = await GetChapterByIdAsync(updatedChapter.Id);
    if (dbChapter is not null)
    {
      dbChapter.Name = updatedChapter.Name;
      if (updatedChapter.DisbandedDate is not null)
        dbChapter.DisbandedDate = updatedChapter.DisbandedDate;
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