using Org.Entities;

namespace Org.Repository;

public interface IManagerAssignmentRepository
{
  Task<IEnumerable<ManagerAssignment>> GetAllAsync(List<int>? filterIds);
  Task<ManagerAssignment?> GetByIdAsync(int id);
  Task<ManagerAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(ManagerAssignment assignment);
  Task<int> UpdateAsync(ManagerAssignment assignment);
  Task<int> DeleteAsync(int id);
}
