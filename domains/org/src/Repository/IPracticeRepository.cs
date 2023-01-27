using Org.Entities;

namespace Org.Repository;

public interface IPracticeRepository
{
  Task<IEnumerable<Practice>> GetAllAsync(List<int>? filterIds);
  Task<Practice?> GetByIdAsync(int id);
  Task<Practice?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Practice practice);
  Task<int> UpdateAsync(Practice practice);
  Task<int> DeleteAsync(int id);
}