using People.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace People.Repository;

public class IndividualRepository : RepositoryBase<Individual>, IIndividualRepository
{
  public IndividualRepository(PeopleDbContext repositoryContext)
      : base(repositoryContext)
  {
  }

  public async Task<IEnumerable<Individual>> GetAllIndividualsAsync(List<int>? filterIds = null)
  {
    return await FindAllAsync()
        .Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1))
        .Where(s => filterIds == null || filterIds.Contains(s.Id))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Individual?> GetIndividualByIdAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id)).FirstOrDefaultAsync();
  }

  public async Task<Individual?> GetIndividualWithDetailsAsync(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
        .Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1))
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddIndividualAsync(Individual individual)
  {
    await AddAsync(individual);
    return await SaveAsync();
  }

  public async Task<int> UpdateIndividualAsync(Individual updatedIndividual)
  {
    var dbIndividual = await FindByConditionAsync(i => i.Id.Equals(updatedIndividual.Id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
    if (dbIndividual is not null)
    {
      Update(dbIndividual);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteIndividualAsync(int id)
  {
    Delete(id);
    return await SaveAsync();
  }
}