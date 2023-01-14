using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class FunctionTypeRepository : RepositoryBase<FunctionType>, IFunctionTypeRepository
{
  public FunctionTypeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<FunctionType>> GetAllFunctionTypesAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<FunctionType?> GetFunctionTypeByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<FunctionType?> GetFunctionTypeWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddFunctionTypeAsync(FunctionType FunctionType)
  {
    await AddAsync(FunctionType);
    return await SaveAsync();
  }

  public virtual void UpdateFunctionTypeFields(FunctionType update, FunctionType existing)
  {
    existing.Name = update.Name;
  }

  public async Task<int> UpdateFunctionTypeAsync(FunctionType updatedFunctionType)
  {
    var dbFunctionType = await FindById(updatedFunctionType.Id);
    if (dbFunctionType is not null)
    {
      UpdateFunctionTypeFields(updatedFunctionType, dbFunctionType);
      Update(dbFunctionType);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteFunctionTypeAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}