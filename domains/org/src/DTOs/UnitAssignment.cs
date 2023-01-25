namespace Org.DTOs;

public class UnitAssignmentDto
{
  public int Id { get; set; }
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public virtual FunctionTypeDto FunctionType { get; set; } = null!;
  public int UnitId { get; set; }
  public virtual UnitDto Unit { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateUnitAssignmentDto
{
  public required int RoleId { get; set; }
  public required int FunctionTypeId { get; set; }
  public required int UnitId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateUnitAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}
