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

  public async Task<IEnumerable<Individual>> GetAllIndividualsAsync()
  {
    //     var result = context.Individuals.Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1));
    return await FindAllAsync()
        .Include(p => p.Identities.OrderByDescending(c => c.Id).Take(1))
        .OrderBy(s => s.Id)
        .ToListAsync();
  }

  public async Task<Individual?> GetIndividualByIdAsync(int individualId)
  {
    return await FindByConditionAsync(individual => individual.Id.Equals(individualId)).FirstOrDefaultAsync();
  }

  public async Task<Individual?> GetIndividualWithDetailsAsync(int individualId)
  {
    return await FindByConditionAsync(individual => individual.Id.Equals(individualId))
        .Include(s => s.Identities)
        .FirstOrDefaultAsync();
  }

  public async Task<int> AddIndividualAsync(Individual individual)
  {
    await AddAsync(individual);
    return await SaveAsync();
  }

  public async Task<int> UpdateIndividualAsync(Individual individual)
  {
    var dbIndividual = await FindByConditionAsync(i => i.Id.Equals(individual.Id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
    if (dbIndividual is not null)
    {
      Update(individual);
      return await SaveAsync();
    }
    else { return 0; }
  }

  public async Task<int> DeleteIndividualAsync(int individualId)
  {
    Delete(individualId);
    return await SaveAsync();
  }
}