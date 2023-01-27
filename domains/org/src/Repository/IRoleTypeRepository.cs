using Org.Entities;

namespace Org.Repository;

public interface IRoleTypeRepository
{
  Task<IEnumerable<RoleType>> GetAllAsync(List<int>? filterIds);
  Task<RoleType?> GetByIdAsync(int id);
  Task<RoleType?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(RoleType roleType);
  Task<int> UpdateAsync(RoleType roleType);
  Task<int> DeleteAsync(int id);
}