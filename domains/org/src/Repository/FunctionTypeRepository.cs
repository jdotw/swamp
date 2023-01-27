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

  public async Task<IEnumerable<FunctionType>> GetAllAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<FunctionType?> GetByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<FunctionType?> GetWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
           .Include(p => p.UnitAssignments)
      .FirstOrDefaultAsync();
  }

  public override async Task<int> AddAsync(FunctionType FunctionType)
  {
    await base.AddAsync(FunctionType);
    return await SaveAsync();
  }

  public virtual void UpdateFields(FunctionType update, FunctionType existing)
  {
    existing.Name = update.Name;
  }

  public async Task<int> UpdateAsync(FunctionType updatedFunctionType)
  {
    var dbFunctionType = await FindById(updatedFunctionType.Id);
    if (dbFunctionType is not null)
    {
      UpdateFields(updatedFunctionType, dbFunctionType);
      Update(dbFunctionType);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}