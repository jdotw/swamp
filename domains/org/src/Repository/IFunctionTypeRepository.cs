using Org.Entities;

namespace Org.Repository;

public interface IFunctionTypeRepository
{
  Task<IEnumerable<FunctionType>> GetAllFunctionTypesAsync(List<int>? filterIds);
  Task<FunctionType?> GetFunctionTypeByIdAsync(int id);
  Task<FunctionType?> GetFunctionTypeWithDetailsAsync(int id);
  Task<int> AddFunctionTypeAsync(FunctionType functionType);
  Task<int> UpdateFunctionTypeAsync(FunctionType functionType);
  Task<int> DeleteFunctionTypeAsync(int id);
}