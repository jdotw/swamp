using Org.Entities;

namespace Org.Repository;

public interface ISquadRepository
{
  Task<IEnumerable<Squad>> GetAllAsync(int tribeId, List<int>? filterIds);
  Task<Squad?> GetByIdAsync(int id);
  Task<Squad?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Squad squad);
  Task<int> UpdateAsync(Squad squad);
  Task<int> DeleteAsync(int id);
}