using Capability.Entities;

public interface IChapterRoleTypeRepository
{
  Task<IEnumerable<ChapterRoleType>> GetAllAsync();
  Task<ChapterRoleType?> GetAsync(int id);
  Task<int> AddAsync(ChapterRoleType type);
  Task<int> UpdateAsync(ChapterRoleType type);
  Task<int> DeleteAsync(int id);
}