namespace Delivery.Entities;

using Base.Entities;

public class TribeRole : EntityBase
{
  // TribeRole descibes an individual taking on
  // a particular TribeRoleType within a 
  // given Tribe
  // 
  // I.e. "John Doe is a Delivery Lead in the 
  // Delivery Tribe"

  public required int IndividualId { get; set; }

  public Tribe Tribe { get; set; } = null!;
  public required int TribeId { get; set; }

  public TribeRoleType TribeRoleType { get; set; } = null!;
  public required int TribeRoleTypeId { get; set; }

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}
