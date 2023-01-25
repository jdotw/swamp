using Base.Entities;

namespace Org.Entities;

public class RoleType : EntityBase
{
  public string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }

  public int? ParentRoleTypeId { get; set; }
  public RoleType? ParentRoleType { get; set; }
  public List<RoleType> ChildRoleTypes { get; set; } = new();

  public List<Role> Roles { get; set; } = new();
}