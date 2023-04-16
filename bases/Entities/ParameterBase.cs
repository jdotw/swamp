

namespace Base.Entities;

public abstract class ParameterBase : EntityBase
{
  public int? ParentId { get; set; }
  
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset RetiredAtDate { get; set; }

  public ParameterBase? Parent { get; set; }
  public List<ParameterBase> Children { get; set; } = new List<ParameterBase>();
}

