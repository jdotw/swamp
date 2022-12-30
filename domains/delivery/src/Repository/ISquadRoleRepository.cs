using Delivery.Entities;

public interface ISquadRoleRepository
{
  Task<IEnumerable<SquadRole>> GetAllAsync(int squadId);
  Task<SquadRole?> GetAsync(int id);
  Task<int> AddAsync(SquadRole role);
  Task<SquadRole?> GetDetailsAsync(int id);
  Task<int> UpdateAsync(SquadRole role);
  Task<int> DeleteAsync(int id);
}