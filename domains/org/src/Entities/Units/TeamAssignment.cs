namespace Org.Entities;

public class TeamAssignment : UnitAssignment
{
  public int TeamId { get; set; }
  public virtual Team Team { get; set; } = null!;
}