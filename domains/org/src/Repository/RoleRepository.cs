using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Microsoft.EntityFrameworkCore.Query;

namespace Org.Repository;

static public class RoleRepositoryExtensions
{
  static public IIncludableQueryable<Role, IEnumerable<RoleAssignment>> IncludeActiveRoleAssignment(this IQueryable<Role> query)
  {
    return query.Include(p => p.RoleAssignments.Where(p => p.EndDate == null).OrderBy(p => p.Id).Take(1));
  }
  static public IIncludableQueryable<Role, IEnumerable<UnitAssignment>> IncludeActiveUnitAssignment(this IQueryable<Role> query)
  {
    return query.Include(p => p.UnitAssignments.Where(p => p.EndDate == null).OrderBy(p => p.Id));
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
        .ThenInclude(p => p.Unit)
      .AsSplitQuery()
      .OrderBy(s => s.Id);
  }

  public async Task<IEnumerable<Role>> GetAllAsync(List<int>? filterIds = null)
  {
    return await GetAll()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .ToListAsync();
  }

  public async Task<IEnumerable<Role>> GetAllAsync(int unitId)
  {
    return await GetAll()
    .Where(s => s.UnitAssignments.Any(u => u.UnitId == unitId))
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
      .ThenInclude(p => p.Unit)
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