using Org.Entities;

namespace Org.Repository;

public interface IPracticeRepository
{
  Task<IEnumerable<Practice>> GetAllPracticesAsync(List<int>? filterIds);
  Task<Practice?> GetPracticeByIdAsync(int id);
  Task<Practice?> GetPracticeWithDetailsAsync(int id);
  Task<int> AddPracticeAsync(Practice practice);
  Task<int> UpdatePracticeAsync(Practice practice);
  Task<int> DeletePracticeAsync(int id);
}