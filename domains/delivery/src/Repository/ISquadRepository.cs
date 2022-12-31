using Delivery.Entities;

public interface ISquadRepository
{
  Task<IEnumerable<Squad>> GetAllSquadsAsync();
  Task<Squad?> GetSquadByIdAsync(int id);
  Task<Squad?> GetSquadWithDetailsAsync(int id);
  Task<int> AddSquadAsync(Squad squad);
  Task<int> UpdateSquadAsync(Squad squad);
  Task<int> DeleteSquadAsync(int id);
}