using Base.Entities;

namespace Org.Entities;

public class RoleAssignment : EntityBase
{
  public int PersonId { get; set; }
  public Person Person { get; set; } = null!;

  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}