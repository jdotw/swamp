namespace Capability.Entities;

using Base.Entities;

public class ChapterRole : EntityBase
{
  // ChapterRole descibes an individual taking on
  // a particular ChapterRoleType within a 
  // given Chapter
  // 
  // I.e. "John Doe is a Chapter Lead in the 
  // React Front-End Chapter"

  public required int IndividualId { get; set; }

  public required int ChapterRoleTypeId { get; set; }
  public ChapterRoleType ChapterRoleType { get; set; } = null!;

  public required int ChapterId { get; set; }
  public Chapter Chapter { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}