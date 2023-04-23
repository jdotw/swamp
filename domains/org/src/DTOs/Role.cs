namespace Org.DTOs;

public class RoleDto
{
  public required int Id { get; set; }

  public required RoleTypeDto RoleType { get; set; } = null!;

  public List<RoleAssignmentDto> RoleAssignments { get; set; } = new();
  public required List<LevelAssignmentDto> LevelAssignments { get; set; } = new();

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required LevelAssignmentDto ActiveLevelAssignment { get; set; } = null!;
  public RoleAssignmentDto? ActiveRoleAssignment { get; set; } = null!;

  public List<CapabilityDto> Capabilities { get; set; } = new();
}

public class RoleCollectionDto
{
  public required int Id { get; set; }

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required RoleTypeCollectionDto RoleType { get; set; } = null!;

  public required LevelAssignmentCollectionDto ActiveLevelAssignment { get; set; } = null!;
  public RoleAssignmentCollectionDto? ActiveRoleAssignment { get; set; } = null!;
}

public class CreateRoleDto : UpdateRoleDto
{
  public required int RoleTypeId { get; set; }
  public required int LevelId { get; set; }
}

public class UpdateRoleDto
{
  public DateTimeOffset? ClosedAtDate { get; set; }
}
