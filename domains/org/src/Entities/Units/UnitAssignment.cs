using System.ComponentModel.DataAnnotations.Schema;
using Base.Entities;

namespace Org.Entities;

public class UnitAssignment : EntityBase
{
  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public FunctionType FunctionType { get; set; } = null!;

  public int UnitId { get; set; }
  public Unit Unit { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}