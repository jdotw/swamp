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

  public async Task<Chapter?> GetChapterByIdAsync(int ChapterId)
  {
    return await FindByConditionAsync(Chapter => Chapter.Id.Equals(ChapterId)).FirstOrDefaultAsync();
  }

  public async Task<Chapter?> GetChapterWithDetailsAsync(int ChapterId)
  {
    return await FindByConditionAsync(Chapter => Chapter.Id.Equals(ChapterId))
        .Include(s => s.ChapterRoles)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddChapterAsync(Chapter Chapter)
  {
    await AddAsync(Chapter);
    return await SaveAsync();
  }

  public async Task<int> UpdateChapterAsync(Chapter Chapter)
  {
    var dbChapter = await GetChapterByIdAsync(Chapter.Id);
    if (dbChapter is not null)
    {
      dbChapter.Name = Chapter.Name;
      Update(dbChapter);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteChapterAsync(int ChapterId)
  {
    Delete(ChapterId);
    return await SaveAsync();
  }
}