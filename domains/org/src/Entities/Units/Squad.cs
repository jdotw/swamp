namespace Org.Entities;

public class Squad : Unit
{
  public int TribeId { get; set; }
  public virtual Tribe Tribe { get; set; } = null!;
}