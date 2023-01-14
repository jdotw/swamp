using Org.Entities;

namespace Org.Repository;

public interface IPersonRepository
{
  Task<IEnumerable<Person>> GetAllPersonsAsync(List<int>? filterIds);
  Task<Person?> GetPersonByIdAsync(int id);
  Task<Person?> GetPersonWithDetailsAsync(int id);
  Task<int> AddPersonAsync(Person person);
  Task<int> UpdatePersonAsync(Person person);
  Task<int> DeletePersonAsync(int id);
}