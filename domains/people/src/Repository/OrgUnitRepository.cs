using People.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace People.Repository;

public class OrgUnitRepository : RepositoryBase<OrgUnit>, IOrgUnitRepository
{
  public OrgUnitRepository(PeopleDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<OrgUnit>> GetAllOrgUnitsAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        // .Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1))
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<OrgUnit?> GetOrgUnitByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<OrgUnit?> GetOrgUnitWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
        // .Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1))
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddOrgUnitAsync(OrgUnit OrgUnit)
  {
    await AddAsync(OrgUnit);
    return await SaveAsync();
  }

  public async Task<int> UpdateOrgUnitAsync(OrgUnit updatedOrgUnit)
  {
    var dbOrgUnit = await FindByConditionAsync(i => i.Id.Equals(updatedOrgUnit.Id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
    if (dbOrgUnit is not null)
    {
      dbOrgUnit.Name = updatedOrgUnit.Name;
      dbOrgUnit.DisbandedDate = updatedOrgUnit.DisbandedDate;
      dbOrgUnit.FormedDate = updatedOrgUnit.FormedDate;
      Update(dbOrgUnit);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteOrgUnitAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}