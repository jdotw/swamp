namespace Delivery.Entities;

using Base.Entities;

public class SquadRole : EntityBase
{
  public required int IndividualId { get; set; }

  public required int SquadRoleTypeId { get; set; }
  public SquadRoleType SquadRoleType { get; set; } = null!;

  public required int SquadId { get; set; }
  public Squad Squad { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}