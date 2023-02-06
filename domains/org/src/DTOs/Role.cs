namespace Org.DTOs;

public class RoleCollectionDto
{
  public required int Id { get; set; }

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required RoleCollectionRoleTypeDto RoleType { get; set; } = null!;

  public required RoleCollectionActiveLevelAssignmentDto ActiveLevelAssignment { get; set; } = null!;
  public RoleCollectionActiveRoleAssignmentDto? ActiveRoleAssignment { get; set; } = null!;
  public UnitAssignmentCollectionDto? DeliveryUnitAssignment { get; set; } = null!;
  public UnitAssignmentCollectionDto? CapabilityUnitAssignment { get; set; } = null!;
}

public class RoleCollectionActiveRoleAssignmentDto
{
  public int Id { get; set; }
  public virtual RoleCollectionPersonDto Person { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
}

public class RoleCollectionRoleTypeDto
{
  public int Id { get; set; }
  public string Title { get; set; } = null!;
}

public class RoleCollectionActiveLevelAssignmentDto
{
  public int Id { get; set; }
  public virtual RoleCollectionLevelDto Level { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
}

public class RoleCollectionLevelDto
{
  public int Id { get; set; }
  public int Index { get; set; }
  public string? ExternalId { get; set; } = null!;
  public string IndividualContributorTitle { get; set; } = null!;
  public string ManagerTitle { get; set; } = null!;
}


public class RoleCollectionPersonDto
{
  public int Id { get; set; }
  public string ExternalId { get; set; } = null!;

  public string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public string LastName { get; set; } = null!;
}

public class RoleDto
{
  public required int Id { get; set; }

  public required RoleTypeDto RoleType { get; set; } = null!;

  public List<RoleAssignmentDto> RoleAssignments { get; set; } = new();
  public List<UnitAssignmentDto> UnitAssignments { get; set; } = new();
  public required List<LevelAssignmentDto> LevelAssignments { get; set; } = new();

  public required DateTimeOffset OpenFromDate { get; set; }
  public DateTimeOffset? ClosedAtDate { get; set; }

  public required LevelAssignmentDto ActiveLevelAssignment { get; set; } = null!;
  public RoleAssignmentDto? ActiveRoleAssignment { get; set; } = null!;
  public UnitAssignmentDto? DeliveryUnitAssignment { get; set; } = null!;
  public UnitAssignmentDto? CapabilityUnitAssignment { get; set; } = null!;
}

public class CreateRoleDto
{
  public required int RoleTypeId { get; set; }
  public required int LevelId { get; set; }
  public required int UnitId { get; set; }
  public required int FunctionTypeId { get; set; }
}

public class CreateUnitRoleDto
{
  public required int RoleTypeId { get; set; }
  public required int LevelId { get; set; }
  public required int FunctionTypeId { get; set; }
}

public class UpdateRoleDto
{
  public DateTimeOffset? ClosedAtDate { get; set; }
}