using People.Entities;

namespace People.Repository;

public interface IOrgUnitRepository
{
  Task<IEnumerable<OrgUnit>> GetAllOrgUnitsAsync(List<int>? filterIds);
  Task<OrgUnit?> GetOrgUnitByIdAsync(int id);
  Task<OrgUnit?> GetOrgUnitWithDetailsAsync(int id);
  Task<int> AddOrgUnitAsync(OrgUnit OrgUnit);
  Task<int> UpdateOrgUnitAsync(OrgUnit OrgUnit);
  Task<int> DeleteOrgUnitAsync(int id);
}