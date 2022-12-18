using People.Models;
using People.DTOs;

namespace People.Interfaces
{
  public interface IIndividualService
  {
    public List<IndividualDto> GetAll();
    public Individual? Get(int id);
    public Individual Add(Individual individual);
    public Individual? Update(Individual individual);
    public Individual? Delete(int id);
    public bool SaveAll();
  }
}