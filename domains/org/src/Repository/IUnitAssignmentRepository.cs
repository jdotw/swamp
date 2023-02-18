using Org.Entities;

namespace Org.Repository;

public interface IUnitAssignmentRepository
{
  Task<IEnumerable<UnitAssignment>> GetAllAsync(List<int>? filterIds);
  Task<IEnumerable<UnitAssignment>> GetAllAsync(int roleId);
  Task<UnitAssignment?> GetByIdAsync(int id);
  Task<UnitAssignment?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(UnitAssignment assignment);
  Task<int> UpdateAsync(UnitAssignment assignment);
  Task<int> DeleteAsync(int id);
}