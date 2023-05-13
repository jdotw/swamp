using Base.Entities;

namespace Org.Entities;

public class Deployment : EntityBase
{
  public required int CapabilityId { get; set; }
  public Capability Capability { get; set; } = null!;

  public required int TeamId { get; set; }
  public Team Team { get; set; } = null!;

  public required int DeploymentTypeId { get; set; }
  public DeploymentType DeploymentType { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
