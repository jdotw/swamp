using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Microsoft.EntityFrameworkCore.Query;

namespace Org.Repository;

static public class RoleRepositoryExtensions
{
  static public IIncludableQueryable<Role, IEnumerable<RoleAssignment>> IncludeActiveRoleAssignment(this IQueryable<Role> query)
  {
    return query.Include(p => p.RoleAssignments.Where(p => p.EndDate == null).OrderBy(p => p.StartDate).Take(1));
  }
  static public IIncludableQueryable<Role, IEnumerable<UnitAssignment>> IncludeActiveUnitAssignment(this IQueryable<Role> query)
  {
    return query.Include(p => p.UnitAssignments.Where(p => p.EndDate == null).OrderBy(p => p.StartDate));
  }
}

public class RoleRepository : RepositoryBase<Role>, IRoleRepository
{
  public RoleRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  private IOrderedQueryable<Role> GetAll()
  {
    return FindAllAsync()
      .Include(p => p.RoleType)
      .Include(p => p.LevelAssignments)
        .ThenInclude(p => p.Level)
      .IncludeActiveRoleAssignment()
        .ThenInclude(p => p.Person)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.FunctionType)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.Practice)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.Chapter)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.Tribe)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.Squad)
      .IncludeActiveUnitAssignment()
        .ThenInclude(p => p.Team)
      .AsSplitQuery()
      .OrderBy(s => s.OpenFromDate);
  }

  public async Task<IEnumerable<Role>> GetAllAsync(List<int>? filterIds = null)
  {
    return await GetAll()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .ToListAsync();
  }

  public async Task<IEnumerable<Role>> GetAllAsync(int squadId)
  {
    return await GetAll()
    .Where(s => s.UnitAssignments.Any(u => u.SquadId == squadId))
    .ToListAsync();
  }

  public async Task<Role?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Role?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.RoleType)
      .Include(p => p.LevelAssignments)
      .ThenInclude(p => p.Level)
      .Include(p => p.RoleAssignments)
      .ThenInclude(p => p.Person)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.FunctionType)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.Practice)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.Chapter)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.Tribe)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.Squad)
      .Include(p => p.UnitAssignments)
      .ThenInclude(p => p.Team)
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