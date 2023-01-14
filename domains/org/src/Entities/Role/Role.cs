using Base.Entities;

namespace Org.Entities;

public class Role : EntityBase
{
  public Boolean isActive { get; set; }

  public RoleType? RoleType { get; set; }

  public int PersonID { get; set; }

  public Person Person { get; set; } = null!;
  // public List<Function> Functions { get; set; } = new();

}