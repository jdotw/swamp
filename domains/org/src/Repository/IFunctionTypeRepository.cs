using Org.Entities;

namespace Org.Repository;

public interface IFunctionTypeRepository
{
  Task<IEnumerable<FunctionType>> GetAllAsync(List<int>? filterIds);
  Task<FunctionType?> GetByIdAsync(int id);
  Task<FunctionType?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(FunctionType functionType);
  Task<int> UpdateAsync(FunctionType functionType);
  Task<int> DeleteAsync(int id);
}