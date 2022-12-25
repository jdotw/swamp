namespace Delivery.Entities
{
  public class SquadRole : BaseEntity
  {
    public required int IndivualId { get; set; }
    public required int SquadRoleId { get; set; }
    public required int SquadId { get; set; }
    public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? EndDate { get; set; }
  }
}