using Base.Entities;

namespace Org.Entities;

public class FunctionType : EntityBase
{
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }

  public virtual List<Function> Functions { get; set; } = new();
}