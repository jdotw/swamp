using Base.Entities;

namespace Org.Entities;

public class Title : ParameterBase
{
  public string Name { get; set; } = string.Empty;
  public int LevelId { get; set; }
  public Level Level { get; set; } = null!;
  public int? TrackId { get; set; }
  public Track? Track { get; set; }
}
