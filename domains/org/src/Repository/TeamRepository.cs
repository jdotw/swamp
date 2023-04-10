using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class TeamRepository : RepositoryBase<Team>, ITeamRepository
{
  public TeamRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Team>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Team?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Team?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Children)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Team Team)
  {
    await base.AddAsync(Team);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Team update, Team existing)
  {
    existing.Name = update.Name;
    existing.Description = update.Description;
    existing.ParentId = update.ParentId;
    existing.DisbandedDate = update.DisbandedDate;
  }

  public async Task<int> UpdateAsync(Team updatedTeam)
  {
    var dbTeam = await FindById(updatedTeam.Id);
    if (dbTeam is not null)
    {
      UpdateFields(updatedTeam, dbTeam);
      Update(dbTeam);
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
