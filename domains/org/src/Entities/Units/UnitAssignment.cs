using Base.Entities;

namespace Org.Entities;

public class UnitAssignment : EntityBase
{
  public string AssignmentType { get; set; } = null!;

  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public FunctionType FunctionType { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}