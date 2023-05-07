namespace Org.DTOs;

public class RoleDto
{
  public required int Id { get; set; }

  public required RoleTypeDto RoleType { get; set; } = null!;

  public List<RoleAssignmentDto> RoleAssignments { get; set; } = new();
  public required List<TitleAssignmentDto> TitleAssignments { get; set; } = new();
  public List<ManagerAssignmentDto> ManagerAssignments { get; set; } = new();

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required TitleAssignmentDto ActiveTitleAssignment { get; set; } = null!;
  public RoleAssignmentDto? ActiveRoleAssignment { get; set; } = null!;

  public List<CapabilityDto> Capabilities { get; set; } = new();
}

public class RoleCollectionDto
{
  public required int Id { get; set; }

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required RoleTypeCollectionDto RoleType { get; set; } = null!;

  public required TitleAssignmentCollectionDto ActiveTitleAssignment { get; set; } = null!;
  public RoleAssignmentCollectionDto? ActiveRoleAssignment { get; set; } = null!;
  public ManagerAssignmentCollectionDto? ActiveManagerAssignment { get; set; } = null!;
}

public class CreateRoleDto : UpdateRoleDto
{
  public required int RoleTypeId { get; set; }
  public required int TitleId { get; set; }
}

public class UpdateRoleDto
{
  public DateTimeOffset? ClosedAtDate { get; set; }
}
