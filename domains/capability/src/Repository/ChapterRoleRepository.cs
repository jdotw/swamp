using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class ChapterRoleRepository : RepositoryBase<ChapterRole>, IChapterRoleRepository
{
  public ChapterRoleRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<ChapterRole>> GetAllAsync(int ChapterId)
  {
    return await FindAllAsync()
      .AsNoTracking()
      .Where(r => r.ChapterId == ChapterId)
      .Include(r => r.ChapterRoleType)
      .Include(r => r.Chapter)
      // .OrderBy(s => s.Name)
      .ToListAsync();
  }

  public async Task<ChapterRole?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public async Task<ChapterRole?> GetDetailsAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id))
      .AsNoTracking()
      .Include(r => r.ChapterRoleType)
      .Include(r => r.Chapter)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(ChapterRole role)
  {
    await base.AddAsync(role);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(ChapterRole role)
  {
    var dbChapterRole = await GetAsync(role.Id);
    if (dbChapterRole is not null)
    {
      dbChapterRole.StartDate = role.StartDate;
      dbChapterRole.EndDate = role.EndDate;
      base.Update(dbChapterRole);
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