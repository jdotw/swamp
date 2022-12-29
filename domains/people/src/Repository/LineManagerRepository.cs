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

  public async Task<LineManager?> GetLineManagerByIdAsync(int lineManagerId)
  {
    return await FindByConditionAsync(lineManager => lineManager.Id.Equals(lineManagerId)).FirstOrDefaultAsync();
  }

  public async Task<int> AddLineManagerAsync(LineManager lineManager)
  {
    await AddAsync(lineManager);
    return await SaveAsync();
  }

  public async Task<int> UpdateLineManagerAsync(LineManager lineManager)
  {
    var dbLineManager = await FindByConditionAsync(l => l.Id.Equals(lineManager.Id))
      .FirstOrDefaultAsync();
    if (dbLineManager is not null)
    {
      dbLineManager.EndDate = lineManager.EndDate;
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