using Delivery.Entities;

public interface ISquadRoleTypeRepository
{
  Task<IEnumerable<SquadRoleType>> GetAllAsync();
  Task<SquadRoleType?> GetAsync(int id);
  Task<int> AddAsync(SquadRoleType type);
  Task<int> UpdateAsync(SquadRoleType type);
  Task<int> DeleteAsync(int id);
}