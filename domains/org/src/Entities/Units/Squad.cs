namespace Org.Entities;

public class Squad : Unit
{
  public Tribe Tribe { get; set; } = null!;
}