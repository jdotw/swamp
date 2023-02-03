using Org.Entities;

namespace Org.Repository;

public interface IRoleRepository
{
  Task<IEnumerable<Role>> GetAllAsync(List<int>? filterIds);
  Task<IEnumerable<Role>> GetAllAsync(int unitId);
  Task<Role?> GetByIdAsync(int id);
  Task<Role?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Role role);
  Task<int> UpdateAsync(Role role);
  Task<int> DeleteAsync(int id);
}