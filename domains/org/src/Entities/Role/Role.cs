using Base.Entities;

namespace Org.Entities;

public class Role : EntityBase
{
  public int? RoleTypeId { get; set; }
  public RoleType? RoleType { get; set; }

  public virtual List<RoleAssignment> RoleAssignments { get; set; } = new();
  // public virtual List<UnitAssignment> UnitAssignments { get; set; } = new();
  public virtual List<LevelAssignment> LevelAssignments { get; set; } = new();

  public DateTimeOffset OpenFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? ClosedAtDate { get; set; }
}
