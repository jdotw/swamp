using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class UnitAssignmentRepository : RepositoryBase<UnitAssignment>, IUnitAssignmentRepository
{
  public UnitAssignmentRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<UnitAssignment>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
      .Where(s => filterIds == null || filterIds.Contains(s.Id))
      .OrderBy(s => s.Id)
      .Include(p => p.Role)
      .Include(p => p.FunctionType)
      .Include(p => p.Unit)
      .AsSplitQuery()
      .ToListAsync();
  }

  public async Task<IEnumerable<UnitAssignment>> GetAllAsync(int roleId)
  {
    return await FindAllAsync()
      .Where(s => s.RoleId == roleId)
      .OrderBy(s => s.Id)
      .Include(p => p.Role)
      .Include(p => p.FunctionType)
      .Include(p => p.Unit)
      .AsSplitQuery()
      .ToListAsync();
  }

  public async Task<UnitAssignment?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .FirstOrDefaultAsync();
  }

  public async Task<UnitAssignment?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Role)
      .Include(p => p.FunctionType)
      .Include(p => p.Unit)
      .AsSplitQuery()
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(UnitAssignment UnitAssignment)
  {
    var unit = await Context.Set<Unit>().FindAsync(UnitAssignment.UnitId);
    IQueryable<UnitAssignment> previousUnitAssignments;
    if (unit is null) { return 0; }
    if (unit is Squad || unit is Tribe)
    {
      previousUnitAssignments = FindByConditionAsync(i => i.RoleId == UnitAssignment.RoleId
                                      && i.EndDate == null
                                      && (i.Unit.UnitType == "squad" || i.Unit.UnitType == "tribe"));
    }
    else if (unit is Practice || unit is Chapter)
    {
      previousUnitAssignments = FindByConditionAsync(i => i.RoleId == UnitAssignment.RoleId
                                      && i.EndDate == null
                                      && (i.Unit.UnitType == "chapter" || i.Unit.UnitType == "practice"));
    }
    else
    {
      previousUnitAssignments = FindByConditionAsync(i => i.RoleId == UnitAssignment.RoleId
                                      && i.EndDate == null
                                      && i.Unit.UnitType == unit.UnitType);
    }

    if (previousUnitAssignments.Any())
    {
      foreach (var assignment in previousUnitAssignments)
      {
        assignment.EndDate = DateTimeOffset.UtcNow;
        Update(assignment);
      }
    }

    await base.AddAsync(UnitAssignment);
    return await SaveAsync();
  }

  public virtual void UpdateFields(UnitAssignment update, UnitAssignment existing)
  {
    existing.EndDate = update.EndDate;
  }

  public async Task<int> UpdateAsync(UnitAssignment updatedUnitAssignment)
  {
    var dbUnitAssignment = await FindById(updatedUnitAssignment.Id);
    if (dbUnitAssignment is not null)
    {
      UpdateFields(updatedUnitAssignment, dbUnitAssignment);
      Update(dbUnitAssignment);
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