using Base.Entities;

namespace Org.Entities;

public class RoleType : EntityBase
{
  public string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }

  public int? ParentId { get; set; }
  public RoleType? Parent { get; set; }
  public List<RoleType> Children { get; set; } = new();

  public List<Role> Roles { get; set; } = new();
}
