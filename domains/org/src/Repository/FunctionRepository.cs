using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class FunctionRepository : RepositoryBase<Function>, IFunctionRepository
{
  public FunctionRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Function>> GetAllFunctionsAsync(int roleId, List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => s.RoleId.Equals(roleId))
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Function?> GetFunctionByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Function?> GetFunctionWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.FunctionType)
      .Include(p => p.Team)
      .Include(p => p.Tribe)
      .Include(p => p.Squad)
      .Include(p => p.Practice)
      .Include(p => p.Chapter)
      .Include(p => p.Role)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddFunctionAsync(Function Function)
  {
    await AddAsync(Function);
    return await SaveAsync();
  }

  public virtual void UpdateFunctionFields(Function update, Function existing)
  {
    existing.Name = update.Name;
  }

  public async Task<int> UpdateFunctionAsync(Function updatedFunction)
  {
    var dbFunction = await FindById(updatedFunction.Id);
    if (dbFunction is not null)
    {
      UpdateFunctionFields(updatedFunction, dbFunction);
      Update(dbFunction);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteFunctionAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}