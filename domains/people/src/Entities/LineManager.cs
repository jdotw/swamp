// A subclass of BaseEntity that describe the relation between
// an Individual and their line manager for a given period of time
// This entity records the history of who has been the line manager 
// for a given individual. 

namespace People.Entities
{
  public class LineManager : BaseEntity
  {
    public int IndividualId { get; set; }
    public Individual Individual { get; set; } = null!;

    public int ManagerId { get; set; }
    public Individual Manager { get; set; } = null!;

    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset? EndDate { get; set; }
  }
}