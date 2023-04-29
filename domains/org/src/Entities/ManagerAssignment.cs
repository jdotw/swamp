using Base.Entities;

namespace Org.Entities;

public class ManagerAssignment : EntityBase
{
  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;

  public required int ManagerId { get; set; }
  public Role Manager { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
