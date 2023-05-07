using System.Text.Json.Serialization;

namespace Org.DTOs;

[JsonDerivedType(typeof(RoleHistoryItemBase))]
[JsonDerivedType(typeof(RoleHistoryOpenedDto))]
[JsonDerivedType(typeof(RoleHistoryClosedDto))]
[JsonDerivedType(typeof(RoleHistoryTitleAssignmentDto))]
[JsonDerivedType(typeof(RoleHistoryRoleAssignmentDto))]
[JsonDerivedType(typeof(RoleHistoryCapabilityAddedDto))]
[JsonDerivedType(typeof(RoleHistoryCapabilityRemovedDto))]
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

public class RoleHistoryTitleAssignmentDto : RoleHistoryItemBase
{
  public string Type { get; } = "title_assignment";
  public TitleAssignmentCollectionDto TitleAssignment { get; set; } = null!;
}

public class RoleHistoryRoleAssignmentDto : RoleHistoryItemBase
{
  public string Type { get; } = "person_assignment";
  public RoleAssignmentCollectionDto RoleAssignment { get; set; } = null!;
}

public class RoleHistoryCapabilityAddedDto : RoleHistoryItemBase
{
  public string Type { get; } = "capability_added";
  public CapabilityCollectionDto Capability { get; set; } = null!;
}

public class RoleHistoryCapabilityRemovedDto : RoleHistoryItemBase
{
  public string Type { get; } = "capability_removed";
  public CapabilityCollectionDto Capability { get; set; } = null!;
}
