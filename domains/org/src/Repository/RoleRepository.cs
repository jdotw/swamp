using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class RoleRepository : RepositoryBase<Role>, IRoleRepository
{
  public RoleRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Role>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .Include(p => p.RoleType)
      .Include(p => p.LevelAssignments)
      .Include(p => p.RoleAssignments)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.FunctionType)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => (p as PracticeAssignment)!.Practice)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => (p as ChapterAssignment)!.Chapter)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => (p as TribeAssignment)!.Tribe)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => (p as SquadAssignment)!.Squad)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => (p as TeamAssignment)!.Team)
      .AsSplitQuery()
      .OrderBy(s => s.Id)
      .ToListAsync();
  }

  public async Task<Role?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Role?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.RoleAssignments)
      .Include(p => p.UnitAssignments)
      .Include(p => p.LevelAssignments)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(Role Role)
  {
    await base.AddAsync(Role);
    return await SaveAsync();
  }

  public virtual void UpdateFields(Role update, Role existing)
  {
    existing.ClosedAtDate = update.ClosedAtDate;
  }

  public async Task<int> UpdateAsync(Role updatedRole)
  {
    var dbRole = await FindById(updatedRole.Id);
    if (dbRole is not null)
    {
      UpdateFields(updatedRole, dbRole);
      Update(dbRole);
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