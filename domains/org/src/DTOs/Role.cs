namespace Org.DTOs;

public class RoleDto
{
  public int Id { get; set; }

  public int RoleTypeId { get; set; }
  public RoleTypeDto RoleType { get; set; } = null!;

  public List<RoleAssignmentDto> RoleAssignments { get; set; } = new();
  public List<UnitAssignmentDto> UnitAssignments { get; set; } = new();
  public List<LevelAssignmentDto> LevelAssignments { get; set; } = new();

  public DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }
}

public class CreateRoleDto
{
  public int RoleTypeId { get; set; }
  public int LevelId { get; set; }
  public int? UnitId { get; set; }
  public int? FunctionId { get; set; }
}

public class UpdateRoleDto
{
  public DateTimeOffset? ClosedAtDate { get; set; }
}