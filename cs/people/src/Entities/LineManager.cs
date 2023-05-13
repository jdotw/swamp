using Base.Entities;

namespace People.Entities;

public class LineManager : EntityBase
{
  public int IndividualId { get; set; }
  public Individual Individual { get; set; } = null!;

  public int ManagerId { get; set; }
  public Individual Manager { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}
