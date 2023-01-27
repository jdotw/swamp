using Org.Entities;

namespace Org.Repository;

public interface ITribeRepository
{
  Task<IEnumerable<Tribe>> GetAllAsync(List<int>? filterIds);
  Task<Tribe?> GetByIdAsync(int id);
  Task<Tribe?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Tribe tribe);
  Task<int> UpdateAsync(Tribe tribe);
  Task<int> DeleteAsync(int id);
}