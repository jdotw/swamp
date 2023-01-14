namespace Org.Entities;

public class Practice : Unit
{
  public List<Chapter> Chapters { get; set; } = new();
}