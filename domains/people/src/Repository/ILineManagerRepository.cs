using People.Entities;

public interface ILineManagerRepository
{
  Task<IEnumerable<LineManager>> GetAllLineManagersAsync(int individualId);
  Task<LineManager?> GetLineManagerByIdAsync(int lineManagerId);
  Task<int> AddLineManagerAsync(LineManager lineManager);
  Task<int> UpdateLineManagerAsync(LineManager lineManager);
  Task<int> DeleteLineManagerAsync(int lineManagerId);
}