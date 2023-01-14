namespace Org.Entities;

public class Tribe : Unit
{
  public List<Squad> Squads { get; set; } = new();
}
