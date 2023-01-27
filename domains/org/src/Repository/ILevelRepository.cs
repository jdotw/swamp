using Org.Entities;

namespace Org.Repository;

public interface ILevelRepository
{
  Task<IEnumerable<Level>> GetAllAsync(List<int>? filterIds);
  Task<Level?> GetByIdAsync(int id);
  Task<Level?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Level level);
  Task<int> UpdateAsync(Level level);
  Task<int> DeleteAsync(int id);
}