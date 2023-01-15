using Org.Entities;

namespace Org.Repository;

public interface ITeamRepository
{
  Task<IEnumerable<Team>> GetAllTeamsAsync(List<int>? filterIds);
  Task<Team?> GetTeamByIdAsync(int id);
  Task<Team?> GetTeamWithDetailsAsync(int id);
  Task<int> AddTeamAsync(Team team);
  Task<int> UpdateTeamAsync(Team team);
  Task<int> DeleteTeamAsync(int id);
}