using Capability.Entities;

public interface IChapterRepository
{
  Task<IEnumerable<Chapter>> GetAllChaptersAsync();
  Task<Chapter?> GetChapterByIdAsync(int chapterId);
  Task<Chapter?> GetChapterWithDetailsAsync(int chapterId);
  Task<int> AddChapterAsync(Chapter chapter);
  Task<int> UpdateChapterAsync(Chapter chapter);
  Task<int> DeleteChapterAsync(int chapterId);
}