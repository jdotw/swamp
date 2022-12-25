namespace Delivery.Entities
{
  public class TribeRoleType : BaseEntity
  {
    public required string Name { get; set; }
    public List<TribeRole> TribeRoles { get; set; } = new List<TribeRole>();
  }
}