using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class TitleRepository : RepositoryBase<Title>, ITitleRepository
{
  public TitleRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Title>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public virtual async Task<Title?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Title?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Title title)
  {
    await base.AddAsync(title);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Title update, Title existing)
  {
    existing.Name = update.Name;
    existing.RetiredAtDate = update.RetiredAtDate;
  }

  public async Task<int> UpdateAsync(Title updatedTitle)
  {
    var dbTitle = await FindById(updatedTitle.Id);
    if (dbTitle is not null)
    {
      UpdateFields(updatedTitle, dbTitle);
      Update(dbTitle);
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
