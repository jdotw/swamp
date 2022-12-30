namespace Delivery.Entities;

using Base.Entities;

public class ChapterRoleType : EntityBase
{
  public required string Name { get; set; }
  public List<ChapterRole> ChapterRoles { get; set; } = new List<ChapterRole>();
}