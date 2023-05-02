using Base.Entities;

namespace Org.Entities;

public class Track : ParameterBase
{
  public string Name { get; set; } = string.Empty;
  public Track? Parent { get; set; }
  public List<Track> Children { get; set; } = new();
}
