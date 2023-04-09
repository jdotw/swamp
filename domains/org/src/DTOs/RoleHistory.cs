using System.Text.Json.Serialization;

namespace Org.DTOs;

[JsonDerivedType(typeof(RoleHistoryItemBase))]
[JsonDerivedType(typeof(RoleHistoryOpenedDto))]
[JsonDerivedType(typeof(RoleHistoryClosedDto))]
[JsonDerivedType(typeof(RoleHistoryUnitAssignmentDto))]
[JsonDerivedType(typeof(RoleHistoryLevelAssignmentDto))]
[JsonDerivedType(typeof(RoleHistoryRoleAssignmentDto))]
public class RoleHistoryItemBase
{
  public DateTimeOffset Date { get; set; }
}

public class RoleHistoryOpenedDto : RoleHistoryItemBase
{
  public string Type { get; } = "opened";
}

public class RoleHistoryClosedDto : RoleHistoryItemBase
{
  public string Type { get; } = "closed";
}

public class RoleHistoryUnitAssignmentDto : RoleHistoryItemBase
{
  public string Type { get; } = "unit_assignment";
  // public UnitAssignmentCollectionDto UnitAssignment { get; set; } = null!;
}

public class RoleHistoryLevelAssignmentDto : RoleHistoryItemBase
{
  public string Type { get; } = "level_assignment";
  public LevelAssignmentCollectionDto LevelAssignment { get; set; } = null!;
}

public class RoleHistoryRoleAssignmentDto : RoleHistoryItemBase
{
  public string Type { get; } = "person_assignment";
  public RoleAssignmentCollectionDto RoleAssignment { get; set; } = null!;
}
