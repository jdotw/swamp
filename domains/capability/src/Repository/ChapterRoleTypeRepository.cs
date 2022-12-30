using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class ChapterRoleTypeRepository : RepositoryBase<ChapterRoleType>, IChapterRoleTypeRepository
{
  public ChapterRoleTypeRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<ChapterRoleType>> GetAllAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<ChapterRoleType?> GetAsync(int id)
  {
    return await FindByConditionAsync(r => r.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(ChapterRoleType type)
  {
    await base.AddAsync(type);
    return await SaveAsync();
  }

  public async Task<int> UpdateAsync(ChapterRoleType type)
  {
    var dbChapterRoleType = await GetAsync(type.Id);
    if (dbChapterRoleType is not null)
    {
      dbChapterRoleType.Name = type.Name;
      base.Update(dbChapterRoleType);
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