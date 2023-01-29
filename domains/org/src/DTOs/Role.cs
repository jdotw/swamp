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

  public UnitAssignmentDto? DeliveryUnitAssignment { get; set; } = null!;
  public UnitAssignmentDto? CapabilityUnitAssignment { get; set; } = null!;
}

public class CreateRoleDto
{
  public required int RoleTypeId { get; set; }
  public required int LevelId { get; set; }
  public required string UnitType { get; set; } = null!;
  public required int UnitId { get; set; }
  public required int FunctionTypeId { get; set; }
}

public class UpdateRoleDto
{
  public DateTimeOffset? ClosedAtDate { get; set; }
}