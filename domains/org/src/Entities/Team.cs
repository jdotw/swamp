
using Base.Entities;

namespace Org.Entities;

public class Team : EntityBase
{
  public required string Name { get; set; }
  public string? Description { get; set; }
  public required string Type { get; set; }

  public int? ParentId { get; set; }
  public Team? Parent { get; set; }
  public List<Team> Children { get; set; } = new List<Team>();

  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
