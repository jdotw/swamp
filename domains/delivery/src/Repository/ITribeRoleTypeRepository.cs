using Delivery.Entities;

public interface ITribeRoleTypeRepository
{
  Task<IEnumerable<TribeRoleType>> GetAllAsync();
  Task<TribeRoleType?> GetAsync(int id);
  Task<int> AddAsync(TribeRoleType type);
  Task<int> UpdateAsync(TribeRoleType type);
  Task<int> DeleteAsync(int id);
}