
using Org.Entities;

namespace Org.Repository;

public interface ICapabilitiesRepository
{
  Task<IEnumerable<Capability>> GetAllAsync(List<int>? filterIds);
  Task<IEnumerable<Capability>> GetAllByRoleIdAsync(int roleId, bool activeOnly);
  Task<Capability?> GetByIdAsync(int id);
  Task<Capability?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Capability level);
  Task<int> UpdateAsync(Capability level);
  // Task<int> DeleteAsync(int id);
}

