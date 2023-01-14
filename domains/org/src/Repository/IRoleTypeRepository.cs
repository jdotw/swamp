using Org.Entities;

namespace Org.Repository;

public interface IRoleTypeRepository
{
  Task<IEnumerable<RoleType>> GetAllRoleTypesAsync(List<int>? filterIds);
  Task<RoleType?> GetRoleTypeByIdAsync(int id);
  Task<RoleType?> GetRoleTypeWithDetailsAsync(int id);
  Task<int> AddRoleTypeAsync(RoleType roleType);
  Task<int> UpdateRoleTypeAsync(RoleType roleType);
  Task<int> DeleteRoleTypeAsync(int id);
}