using Base.Entities;

namespace Org.Entities;

public class Function : EntityBase
{
  public int? FunctionTypeId { get; set; }
  public FunctionType? FunctionType { get; set; }

  public string? Name { get; set; }

  public int? TribeId { get; set; }
  public Tribe? Tribe { get; set; } = null!;
  public int? SquadId { get; set; }
  public Squad? Squad { get; set; } = null!;
  public int? PracticeId { get; set; }
  public Practice? Practice { get; set; } = null!;
  public int? ChapterId { get; set; }
  public Chapter? Chapter { get; set; } = null!;
  public int? TeamId { get; set; }
  public Team? Team { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  public int? RoleId { get; set; }
  public Role Role { get; set; } = null!;
}