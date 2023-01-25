using Base.Entities;

namespace Org.Entities;

public class LevelAssignment : EntityBase
{
  public int LevelId { get; set; }
  public Level Level { get; set; } = null!;

  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}