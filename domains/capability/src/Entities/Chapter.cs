namespace Delivery.Entities;

using Base.Entities;

public class Chapter : EntityBase
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }

  public int PracticeId { get; set; }
  public Practice Practice { get; set; } = null!;

  public List<ChapterRole> ChapterRoles { get; set; } = new List<ChapterRole>();

}