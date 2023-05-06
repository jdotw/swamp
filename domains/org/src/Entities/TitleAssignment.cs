using Base.Entities;

namespace Org.Entities;

public class TitleAssignment : EntityBase
{
  public int TitleId { get; set; }
  public Title Title { get; set; } = null!;

  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}
