namespace Org.DTOs;

public class HomeAssignmentDto
{
  public int Id { get; set; }
  public int TeamId { get; set; }
  public virtual TeamDto Team { get; set; } = null!;
  public int CapabilityId { get; set; }
  public virtual CapabilityDto Capability { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class HomeAssignmentCollectionDto : HomeAssignmentDto
{
  public new TeamCollectionDto Team { get; set; } = null!;
  public new CapabilityCollectionDto Capability { get; set; } = null!;
}

public class UpdateHomeAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateHomeAssignmentDto : UpdateHomeAssignmentDto
{
  public required int TeamId { get; set; }
  public required int CapabilityId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
}

