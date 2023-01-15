using Org.Entities;

namespace Org.Repository;

public interface IChapterRepository
{
  Task<IEnumerable<Chapter>> GetAllChaptersAsync(int practiceId, List<int>? filterIds);
  Task<Chapter?> GetChapterByIdAsync(int id);
  Task<Chapter?> GetChapterWithDetailsAsync(int id);
  Task<int> AddChapterAsync(Chapter chapter);
  Task<int> UpdateChapterAsync(Chapter chapter);
  Task<int> DeleteChapterAsync(int id);
}