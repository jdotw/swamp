using Delivery.Entities;

public interface ISquadRepository
{
  Task<IEnumerable<Squad>> GetAllSquadsAsync();
  Task<Squad?> GetSquadByIdAsync(int squadId);
  Task<Squad?> GetSquadWithDetailsAsync(int squadId);
  Task<int> AddSquadAsync(Squad squad);
  Task<int> UpdateSquadAsync(Squad squad);
  Task<int> DeleteSquadAsync(int squadId);
}