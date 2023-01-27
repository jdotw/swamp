using Org.Entities;

namespace Org.Repository;

public interface ILevelAssignmentRepository
{
  Task<IEnumerable<LevelAssignment>> GetAllAsync(List<int>? filterIds);
  Task<LevelAssignment?> GetByIdAsync(int id);
  Task<LevelAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(LevelAssignment assignment);
  Task<int> UpdateAsync(LevelAssignment assignment);
  Task<int> DeleteAsync(int id);
}