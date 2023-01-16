using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class TeamRepository : UnitRepository<Team>, ITeamRepository
{
  public TeamRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Team>> GetAllTeamsAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Team?> GetTeamByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Team?> GetTeamWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddTeamAsync(Team Team)
  {
    await AddAsync(Team);
    return await SaveAsync();
  }

  public virtual void UpdateTeamFields(Team update, Team existing)
  {
    base.UpdateUnitFields(update, existing);
  }

  public async Task<int> UpdateTeamAsync(Team updatedTeam)
  {
    var dbTeam = await FindById(updatedTeam.Id);
    if (dbTeam is not null)
    {
      UpdateTeamFields(updatedTeam, dbTeam);
      Update(dbTeam);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteTeamAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}