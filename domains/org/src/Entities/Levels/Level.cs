using Base.Entities;

namespace Org.Entities;

public class Level : EntityBase
{
  public string IndividualContributorTitle { get; set; } = null!;
  public string ManagerTitle { get; set; } = null!;

  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset RetiredAtDate { get; set; }

  public List<LevelAssignment> LevelAssignments { get; set; } = new();
}