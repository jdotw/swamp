namespace Delivery.Entities;

public class Tribe : BaseEntity
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }

  public List<TribeRole> TribeRoles { get; set; } = new List<TribeRole>();
}