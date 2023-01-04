using Capability.Entities;

public interface IChapterRoleRepository
{
  Task<IEnumerable<ChapterRole>> GetAllAsync(int chapterId);
  Task<IEnumerable<ChapterRole>> GetAllByIndividualIdAsync(int individualId);
  Task<ChapterRole?> GetAsync(int id);
  Task<int> AddAsync(ChapterRole role);
  Task<ChapterRole?> GetDetailsAsync(int id);
  Task<int> UpdateAsync(ChapterRole role);
  Task<int> DeleteAsync(int id);
}