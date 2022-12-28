using People.Entities;

public interface IIndividualRepository
{
  Task<IEnumerable<Individual>> GetAllIndividualsAsync();
  Task<Individual?> GetIndividualByIdAsync(int individualId);
  Task<Individual?> GetIndividualWithDetailsAsync(int individualId);
  Task<int> AddIndividualAsync(Individual individual);
  Task<int> UpdateIndividualAsync(Individual individual);
  Task<int> DeleteIndividualAsync(int individualId);
}