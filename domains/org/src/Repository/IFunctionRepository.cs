using Org.Entities;

namespace Org.Repository;

public interface IFunctionRepository
{
  Task<IEnumerable<Function>> GetAllFunctionsAsync(int roleId, List<int>? filterIds);
  Task<Function?> GetFunctionByIdAsync(int id);
  Task<Function?> GetFunctionWithDetailsAsync(int id);
  Task<int> AddFunctionAsync(Function function);
  Task<int> UpdateFunctionAsync(Function function);
  Task<int> DeleteFunctionAsync(int id);
}