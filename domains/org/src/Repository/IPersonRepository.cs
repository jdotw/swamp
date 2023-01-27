using Org.Entities;

namespace Org.Repository;

public interface IPersonRepository
{
  Task<IEnumerable<Person>> GetAllAsync(List<int>? filterIds);
  Task<Person?> GetByIdAsync(int id);
  Task<Person?> GetWithDetailsAsync(int id);
  Task<int> AddAsync(Person person);
  Task<int> UpdateAsync(Person person);
  Task<int> DeleteAsync(int id);
}