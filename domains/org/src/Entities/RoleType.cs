using Base.Entities;

namespace Org.Entities;

public class RoleType : ParameterBase
{
  public string Name { get; set; } = null!;

  public List<Role> Roles { get; set; } = new();

  public RoleType? Parent { get; set; }
  public List<RoleType> Children { get; set; } = new();

  public List<CapabilityType> CapabilityTypes { get; set; } = new();
}
