namespace Delivery.Entities;

using Base.Entities;

public class Tribe : EntityBase
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }

  public List<Squad> Squads { get; set; } = new List<Squad>();

  public List<TribeRole> TribeRoles { get; set; } = new List<TribeRole>();
}