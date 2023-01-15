using Org.Entities;

namespace Org.Repository;

public interface ITribeRepository
{
  Task<IEnumerable<Tribe>> GetAllTribesAsync(List<int>? filterIds);
  Task<Tribe?> GetTribeByIdAsync(int id);
  Task<Tribe?> GetTribeWithDetailsAsync(int id);
  Task<int> AddTribeAsync(Tribe tribe);
  Task<int> UpdateTribeAsync(Tribe tribe);
  Task<int> DeleteTribeAsync(int id);
}