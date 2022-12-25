namespace Delivery.Entities
{
  public class SquadRoleType : BaseEntity
  {
    public required string Name { get; set; }
    public List<SquadRole> SquadRoles { get; set; } = new List<SquadRole>();
  }
}