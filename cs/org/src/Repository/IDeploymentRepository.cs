using Org.Entities;

namespace Org.Repository;

public interface IDeploymentRepository
{
  Task<IEnumerable<Deployment>> GetAllAsync(List<int>? filterIds);
  Task<Deployment?> GetByIdAsync(int id);
  Task<Deployment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Deployment assignment);
  Task<int> UpdateAsync(Deployment assignment);
  Task<int> DeleteAsync(int id);
}
