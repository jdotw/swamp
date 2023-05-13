
using Org.Entities;

namespace Org.Repository;

public interface IDeploymentTypeRepository
{
  Task<IEnumerable<DeploymentType>> GetAllAsync(List<int>? filterIds);
  Task<DeploymentType?> GetByIdAsync(int id);
  Task<DeploymentType?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(DeploymentType level);
  Task<int> UpdateAsync(DeploymentType level);
  Task<int> DeleteAsync(int id);
}

