using Capability.Entities;

public interface IPracticeRoleTypeRepository
{
  Task<IEnumerable<PracticeRoleType>> GetAllAsync();
  Task<PracticeRoleType?> GetAsync(int id);
  Task<int> AddAsync(PracticeRoleType type);
  Task<int> UpdateAsync(PracticeRoleType type);
  Task<int> DeleteAsync(int id);
}