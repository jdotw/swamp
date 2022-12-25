namespace Delivery.Entities;

using Base.Entities;

public class TribeRole : EntityBase
{
  public required int IndividualId { get; set; }

  public TribeRoleType TribeRoleType { get; set; } = null!;
  public Tribe Tribe { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
