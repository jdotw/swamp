namespace Capability.Entities;

using Base.Entities;

public class Practice : EntityBase
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }

  public List<Chapter> Chapters { get; set; } = new List<Chapter>();

  public List<PracticeRole> PracticeRoles { get; set; } = new List<PracticeRole>();
}