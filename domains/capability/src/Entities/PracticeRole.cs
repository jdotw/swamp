namespace Delivery.Entities;

using Base.Entities;

public class PracticeRole : EntityBase
{
  // PracticeRole descibes an individual taking on
  // a particular PracticeRoleType within a 
  // given Practice
  // 
  // I.e. "John Doe is a Practice Lead in the 
  // Cloud Practice"

  public required int IndividualId { get; set; }

  public Practice Practice { get; set; } = null!;
  public required int PracticeId { get; set; }

  public PracticeRoleType PracticeRoleType { get; set; } = null!;
  public required int PracticeRoleTypeId { get; set; }

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
