using Base.Entities;

namespace Org.Entities;

public class FunctionType : EntityBase
{
  public string Name { get; set; } = null!;
  public Boolean IsIndividualContributor { get; set; }

  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }

  public List<UnitAssignment> UnitAssignments { get; set; } = new();
}