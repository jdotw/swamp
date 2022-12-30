using Capability.Entities;

public interface IPracticeRoleRepository
{
  Task<IEnumerable<PracticeRole>> GetAllAsync(int practiceId);
  Task<PracticeRole?> GetAsync(int id);
  Task<int> AddAsync(PracticeRole role);
  Task<PracticeRole?> GetDetailsAsync(int id);
  Task<int> UpdateAsync(PracticeRole role);
  Task<int> DeleteAsync(int id);
}