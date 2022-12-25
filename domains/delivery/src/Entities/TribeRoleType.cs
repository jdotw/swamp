namespace Delivery.Entities;

using Base.Entities;

public class TribeRoleType : EntityBase
{
  public required string Name { get; set; }
  public List<TribeRole> TribeRoles { get; set; } = new List<TribeRole>();
}