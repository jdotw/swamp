using Org.Entities;

namespace Org.Repository;

public interface ISquadRepository
{
  Task<IEnumerable<Squad>> GetAllSquadsAsync(int tribeId, List<int>? filterIds);
  Task<Squad?> GetSquadByIdAsync(int id);
  Task<Squad?> GetSquadWithDetailsAsync(int id);
  Task<int> AddSquadAsync(Squad squad);
  Task<int> UpdateSquadAsync(Squad squad);
  Task<int> DeleteSquadAsync(int id);
}