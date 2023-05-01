using Base.Entities;

namespace Org.Entities;

public class Role : EntityBase
{
  public int? RoleTypeId { get; set; }
  public RoleType? RoleType { get; set; }

  public string CareerTrack { get; set; } = string.Empty;

  public virtual List<RoleAssignment> RoleAssignments { get; set; } = new();
  public virtual List<LevelAssignment> LevelAssignments { get; set; } = new();
  public virtual List<ManagerAssignment> ManagerAssignments { get; set; } = new();

  public virtual List<Capability> Capabilities { get; set; } = new();

  public DateTimeOffset OpenFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? ClosedAtDate { get; set; }
}
