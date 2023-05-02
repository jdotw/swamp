using Org.Entities;

namespace Org.Repository;

public interface ITitleRepository
{
  Task<IEnumerable<Title>> GetAllAsync(List<int>? filterIds);
  Task<Title?> GetByIdAsync(int id);
  Task<Title?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Title level);
  Task<int> UpdateAsync(Title level);
  Task<int> DeleteAsync(int id);
}
