using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository;

public class PracticeRepository : RepositoryBase<Practice>, IPracticeRepository
{
  public PracticeRepository(CapabilityDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Practice>> GetAllPracticesAsync()
  {
    return await FindAllAsync()
        .OrderBy(s => s.Name)
        .ToListAsync();
  }

  public async Task<Practice?> GetPracticeByIdAsync(int practiceId)
  {
    return await FindByConditionAsync(practice => practice.Id.Equals(practiceId)).FirstOrDefaultAsync();
  }

  public async Task<Practice?> GetPracticeWithDetailsAsync(int practiceId)
  {
    return await FindByConditionAsync(practice => practice.Id.Equals(practiceId))
        .Include(s => s.PracticeRoles)
        .Include(s => s.Chapters)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddPracticeAsync(Practice practice)
  {
    await AddAsync(practice);
    return await SaveAsync();
  }

  public async Task<int> UpdatePracticeAsync(Practice practice)
  {
    var dbPractice = await GetPracticeByIdAsync(practice.Id);
    if (dbPractice is not null)
    {
      dbPractice.Name = practice.Name;
      Update(dbPractice);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeletePracticeAsync(int practiceId)
  {
    Delete(practiceId);
    return await SaveAsync();
  }
}