using People.Entities;
using People.DTOs;

namespace People.Interfaces
{
  public interface ILineManagerService
  {
    public List<LineManagerDto> GetAll(int individualId);
    public LineManagerDto? Get(int id);
    public LineManagerDto Add(int individualId, AddLineManagerDto individual);
    public LineManagerDto? Update(int id, MutateLineManagerDto individual);
    public bool Delete(int id);
    public bool SaveAll();
  }
}