using People.Entities;
using People.DTOs;

namespace People.Interfaces
{
  public interface IIndividualService
  {
    public List<IndividualIdentifiersDto> GetAll();
    public IndividualDto? Get(int id);
    public IndividualDto Add(MutateIndividualDto individual);
    public IndividualDto? Update(int id, MutateIndividualDto individual);
    public bool Delete(int id);
    public bool SaveAll();
  }
}