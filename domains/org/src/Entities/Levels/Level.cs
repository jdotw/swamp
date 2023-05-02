using Base.Entities;

namespace Org.Entities;

public class Level : ParameterBase
{
  public int Index { get; set; }
  public string? ExternalId { get; set; }
  public string? IndividualContributorTitle { get; set; }
  public string? ManagerTitle { get; set; }

  public Level? Parent { get; set; }
  public List<Level> Children { get; set; } = new();

  public List<LevelAssignment> LevelAssignments { get; set; } = new();
  public List<Title> Titles { get; set; } = new();
}
