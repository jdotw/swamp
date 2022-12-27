using People.DTOs;

namespace People.Interfaces;

public interface IIndividualService
{
  List<IndividualDto> GetAll();
  IndividualDto? Get(int id);
  IndividualDto Add(MutateIndividualDto individual);
  IndividualDto? Update(int id, MutateIndividualDto individual);
  bool Delete(int id);
  bool SaveAll();
}