using Base.Entities;

namespace Org.Entities;

public class Level : ParameterBase
{
  public int Index { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? ExternalId { get; set; }

  public Level? Parent { get; set; }
  public List<Level> Children { get; set; } = new();

  public List<Title> Titles { get; set; } = new();
}
