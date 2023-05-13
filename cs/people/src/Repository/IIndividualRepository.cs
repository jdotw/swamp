using People.Entities;

public interface IIndividualRepository
{
  Task<IEnumerable<Individual>> GetAllIndividualsAsync(List<int>? filterIds);
  Task<Individual?> GetIndividualByIdAsync(int id);
  Task<Individual?> GetIndividualWithDetailsAsync(int id);
  Task<int> AddIndividualAsync(Individual individual);
  Task<int> UpdateIndividualAsync(Individual individual);
  Task<int> DeleteIndividualAsync(int id);
}