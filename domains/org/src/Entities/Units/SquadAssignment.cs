namespace Org.Entities;

public class SquadAssignment : UnitAssignment
{
  public int SquadId { get; set; }
  public virtual Squad Squad { get; set; } = null!;
}