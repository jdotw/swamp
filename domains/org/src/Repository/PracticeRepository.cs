using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public class PracticeRepository : UnitRepository<Practice>, IPracticeRepository
{
  public PracticeRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Practice>> GetAllPracticesAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Practice?> GetPracticeByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Practice?> GetPracticeWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .Include(p => p.Functions)
      .FirstOrDefaultAsync();
  }

  public async Task<int> AddPracticeAsync(Practice Practice)
  {
    await AddAsync(Practice);
    return await SaveAsync();
  }

  public virtual void UpdatePracticeFields(Practice update, Practice existing)
  {
    base.UpdateUnitFields(update, existing);
  }

  public async Task<int> UpdatePracticeAsync(Practice updatedPractice)
  {
    var dbPractice = await FindById(updatedPractice.Id);
    if (dbPractice is not null)
    {
      UpdatePracticeFields(updatedPractice, dbPractice);
      Update(dbPractice);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeletePracticeAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}