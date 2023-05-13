using Org.Entities;

namespace Org.Repository;

public interface ITrackRepository
{
  Task<IEnumerable<Track>> GetAllAsync(List<int>? filterIds);
  Task<Track?> GetByIdAsync(int id);
  Task<Track?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Track level);
  Task<int> UpdateAsync(Track level);
  Task<int> DeleteAsync(int id);
}
