using Org.Entities;

namespace Org.Repository;

public interface IRoleAssignmentRepository
{
  Task<IEnumerable<RoleAssignment>> GetAllAsync(List<int>? filterIds);
  Task<IEnumerable<RoleAssignment>> GetAllAsync(int personId);
  Task<RoleAssignment?> GetByIdAsync(int id);
  Task<RoleAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(RoleAssignment assignment);
  Task<int> UpdateAsync(RoleAssignment assignment);
  Task<int> DeleteAsync(int id);
}