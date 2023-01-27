namespace Org.Entities;

public class ChapterAssignment : UnitAssignment
{
  public int ChapterId { get; set; }
  public virtual Chapter Chapter { get; set; } = null!;
}