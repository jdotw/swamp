using Org.Entities;

namespace Org.Repository;

public interface IHomeAssignmentRepository
{
  Task<IEnumerable<HomeAssignment>> GetAllAsync(List<int>? filterIds);
  Task<HomeAssignment?> GetByIdAsync(int id);
  Task<HomeAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(HomeAssignment assignment);
  Task<int> UpdateAsync(HomeAssignment assignment);
  Task<int> DeleteAsync(int id);
}
