using Org.Entities;

namespace Org.Repository;

public interface IRoleRepository
{
  Task<IEnumerable<Role>> GetAllRolesAsync(List<int>? filterIds);
  Task<Role?> GetRoleByIdAsync(int id);
  Task<Role?> GetRoleWithDetailsAsync(int id);
  Task<int> AddRoleAsync(Role role);
  Task<int> UpdateRoleAsync(Role role);
  Task<int> DeleteRoleAsync(int id);
}