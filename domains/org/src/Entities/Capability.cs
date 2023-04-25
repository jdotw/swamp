using Base.Entities;

namespace Org.Entities;

public class Capability : EntityBase
{
  public required int RoleId { get; set; }
  public Role Role { get; set; } = null!;

  public required int CapabilityTypeId { get; set; }
  public CapabilityType CapabilityType { get; set; } = null!;

  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }

  public List<HomeAssignment> HomeAssignments { get; set; } = new();
  public List<Deployment> Deployments { get; set; } = new();
}
