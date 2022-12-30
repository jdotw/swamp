using Capability.Entities;

public interface IPracticeRepository
{
  Task<IEnumerable<Practice>> GetAllPracticesAsync();
  Task<Practice?> GetPracticeByIdAsync(int practiceId);
  Task<Practice?> GetPracticeWithDetailsAsync(int practiceId);
  Task<int> AddPracticeAsync(Practice practice);
  Task<int> UpdatePracticeAsync(Practice practice);
  Task<int> DeletePracticeAsync(int practiceId);
}