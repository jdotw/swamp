using Org.Entities;

namespace Org.Repository;

public interface IChapterRepository
{
  Task<IEnumerable<Chapter>> GetAllAsync(int practiceId, List<int>? filterIds);
  Task<Chapter?> GetByIdAsync(int id);
  Task<Chapter?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Chapter chapter);
  Task<int> UpdateAsync(Chapter chapter);
  Task<int> DeleteAsync(int id);
}