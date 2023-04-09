
using Base.Entities;

namespace Org.Entities;

public class Team : EntityBase
{
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public int Type { get; set; }

  public Team? Parent { get; set; }
  public List<Team> Children { get; set; } = new List<Team>();

  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
