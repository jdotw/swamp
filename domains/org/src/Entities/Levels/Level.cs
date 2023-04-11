using System.ComponentModel.DataAnnotations.Schema;
using Base.Entities;

namespace Org.Entities;

public class Level : ParameterBase
{
  public int Index { get; set; }
  public string? ExternalId { get; set; }
  public string? IndividualContributorTitle { get; set; }
  public string? ManagerTitle { get; set; }

  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset RetiredAtDate { get; set; }

  public List<LevelAssignment> LevelAssignments { get; set; } = new();
}
