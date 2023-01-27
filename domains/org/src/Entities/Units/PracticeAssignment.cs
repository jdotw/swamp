namespace Org.Entities;

public class PracticeAssignment : UnitAssignment
{
  public int PracticeId { get; set; }
  public virtual Practice Practice { get; set; } = null!;
}