using Base.Entities;

namespace Org.Entities;

public class Person : EntityBase
{
  public string ExternalId { get; set; } = null!;

  public string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public string LastName { get; set; } = null!;

  public List<RoleAssignment> RoleAssignments { get; set; } = new();
}
