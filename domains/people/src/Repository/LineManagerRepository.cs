using People.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace People.Repository;

public class LineManagerRepository : RepositoryBase<LineManager>, ILineManagerRepository
{
  public LineManagerRepository(PeopleDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<LineManager>> GetAllLineManagersAsync(int individualId)
  {
    return await FindAllAsync()
        .Where(s => s.IndividualId == individualId)
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<LineManager?> GetLineManagerByIdAsync(int id)
  {
    return await FindByConditionAsync(m => m.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<int> AddLineManagerAsync(LineManager lineManager)
  {
    await AddAsync(lineManager);
    return await SaveAsync();
  }

  public async Task<int> UpdateLineManagerAsync(LineManager updatedLineManager)
  {
    var dbLineManager = await FindByConditionAsync(m => m.Id.Equals(updatedLineManager.Id))
      .FirstOrDefaultAsync();
    if (dbLineManager is not null)
    {
      if (updatedLineManager.EndDate is not null)
        dbLineManager.EndDate = updatedLineManager.EndDate;
      Update(dbLineManager);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteLineManagerAsync(int lineManagerId)
  {
    Delete(lineManagerId);
    return await SaveAsync();
  }
}