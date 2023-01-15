namespace Org.Entities;

public class Chapter : Unit
{
  public int PracticeId { get; set; }
  public virtual Practice Practice { get; set; } = null!;
}