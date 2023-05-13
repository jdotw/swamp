using Base.Entities;

namespace Org.Entities;

public class HomeAssignment : EntityBase
{
  public int CapabilityId { get; set; }
  public Capability Capability { get; set; } = null!;

  public required int TeamId { get; set; }
  public Team Team { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
