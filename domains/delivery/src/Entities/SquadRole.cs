namespace Delivery.Entities
{
  public class SquadRole : BaseEntity
  {
    public required int IndividualId { get; set; }

    public SquadRoleType SquadRoleType { get; set; } = null!;
    public Squad Squad { get; set; } = null!;

    public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? EndDate { get; set; }
  }
}