using Base.Entities;

namespace Org.Entities;

public class DeploymentType : ParameterBase
{
  public required string Name { get; set; }
  public DeploymentType? Parent { get; set; }
  public List<DeploymentType> Children { get; set; } = new();
}
