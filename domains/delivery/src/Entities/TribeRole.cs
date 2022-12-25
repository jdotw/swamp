namespace Delivery.Entities
{
  public class TribeRole : BaseEntity
  {
    public required int IndividualId { get; set; }

    public TribeRoleType TribeRoleType { get; set; } = null!;
    public Tribe Tribe { get; set; } = null!;

    public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? EndDate { get; set; }
  }
}