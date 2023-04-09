

namespace Base.Entities;

public abstract class ParameterBase : EntityBase
{
  public ParameterBase? Parent { get; set; }
  public List<ParameterBase> Children { get; set; } = new List<ParameterBase>();
}

