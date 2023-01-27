namespace Org.Entities;

public class TribeAssignment : UnitAssignment
{
  public int TribeId { get; set; }
  public virtual Tribe Tribe { get; set; } = null!;
}