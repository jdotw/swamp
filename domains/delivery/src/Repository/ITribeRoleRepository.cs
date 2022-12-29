using Delivery.Entities;

public interface ITribeRoleRepository
{
  Task<IEnumerable<TribeRole>> GetAllAsync(int tribeId);
  Task<TribeRole?> GetAsync(int id);
  Task<int> AddAsync(TribeRole role);
  Task<TribeRole?> GetDetailsAsync(int id);
  Task<int> UpdateAsync(TribeRole role);
  Task<int> DeleteAsync(int id);
}