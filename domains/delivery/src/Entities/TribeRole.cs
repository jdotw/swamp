namespace Delivery.Entities
{
  public class TribeRole : BaseEntity
  {
    public required int IndivualId { get; set; }
    public required int TribeRoleId { get; set; }
    public required int TribeId { get; set; }
    public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? EndDate { get; set; }
  }
}