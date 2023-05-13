using Org.Entities;

namespace Org.Repository;

public interface ITitleAssignmentRepository
{
  Task<IEnumerable<TitleAssignment>> GetAllAsync(List<int>? filterIds);
  Task<TitleAssignment?> GetByIdAsync(int id);
  Task<TitleAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(TitleAssignment assignment);
  Task<int> UpdateAsync(TitleAssignment assignment);
  Task<int> DeleteAsync(int id);
}
