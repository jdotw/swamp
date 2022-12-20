using Entity.Models;
using People.DTOs;

namespace People.Interfaces
{
  public interface IIndividualService
  {
    public List<Individual> GetAll();
    public Individual? Get(int id);
    public Individual Add(Individual individual);
    public Individual? Update(Individual individual);
    public Individual? Delete(int id);
    public bool SaveAll();
  }
}