using Base.Entities;

namespace Org.Entities;

public class Function : EntityBase
{
  public FunctionType? FunctionType { get; set; }
  public Role Role { get; set; } = null!;

  public Tribe? Tribe { get; set; } = null!;
  public Squad? Squad { get; set; } = null!;
  public Practice? Practice { get; set; } = null!;
  public Chapter? Chapter { get; set; } = null!;
  public Team? Team { get; set; } = null!;
}