// Squad class inherits from the abstract class Entity
// Has fields name

namespace Delivery.Entities;

using Base.Entities;

public class Squad : EntityBase
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }

  public List<SquadRole> SquadRoles { get; set; } = new List<SquadRole>();

}