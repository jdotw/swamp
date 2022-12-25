namespace Delivery.Entities;

using Base.Entities;

public class SquadRoleType : EntityBase
{
  public required string Name { get; set; }
  public List<SquadRole> SquadRoles { get; set; } = new List<SquadRole>();
}