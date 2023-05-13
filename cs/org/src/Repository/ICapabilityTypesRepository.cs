
using Org.Entities;

namespace Org.Repository;

public interface ICapabilityTypeRepository
{
  Task<IEnumerable<CapabilityType>> GetAllAsync(List<int>? filterIds);
  Task<CapabilityType?> GetByIdAsync(int id);
  Task<CapabilityType?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(CapabilityType level);
  Task<int> UpdateAsync(CapabilityType level);
  Task<int> DeleteAsync(int id);
}

