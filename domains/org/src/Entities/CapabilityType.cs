using Base.Entities;

namespace Org.Entities;

public class CapabilityType : ParameterBase
{
  public required string Name { get; set; }

  public CapabilityType? Parent { get; set; }
  public List<CapabilityType> Children { get; set; } = new();

  public int? RoleTypeId { get; set; }
  public RoleType? RoleType { get; set; }
}
