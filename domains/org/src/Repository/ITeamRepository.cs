using Org.Entities;

namespace Org.Repository;

public interface ITeamRepository
{
  Task<IEnumerable<Team>> GetAllAsync(List<int>? filterIds);
  Task<Team?> GetByIdAsync(int id);
  Task<Team?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Team team);
  Task<int> UpdateAsync(Team team);
  Task<int> DeleteAsync(int id);
}