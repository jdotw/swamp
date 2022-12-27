using Delivery.Entities;

public interface ITribeRepository
{
  Task<IEnumerable<Tribe>> GetAllTribesAsync();
  Task<Tribe?> GetTribeByIdAsync(int tribeId);
  Task<Tribe?> GetTribeWithDetailsAsync(int tribeId);
  Task<int> AddTribeAsync(Tribe tribe);
  Task<int> UpdateTribeAsync(Tribe tribe);
  Task<int> DeleteTribeAsync(int tribeId);
}