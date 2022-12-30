namespace Delivery.Entities;

using Base.Entities;

public class PracticeRoleType : EntityBase
{
  public required string Name { get; set; }
  public List<PracticeRole> PracticeRoles { get; set; } = new List<PracticeRole>();
}