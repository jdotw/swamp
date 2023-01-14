using Base.Entities;

namespace Org.Entities;

public abstract class Unit : EntityBase
{
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public List<Function> Functions { get; set; } = new();
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}