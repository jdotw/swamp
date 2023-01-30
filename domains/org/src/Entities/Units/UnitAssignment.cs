using System.ComponentModel.DataAnnotations.Schema;
using Base.Entities;

namespace Org.Entities;

public class UnitAssignment : EntityBase
{
  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public FunctionType FunctionType { get; set; } = null!;

  public int? PracticeId { get; set; }
  public virtual Practice? Practice { get; set; } = null!;
  public int? ChapterId { get; set; }
  public virtual Chapter? Chapter { get; set; } = null!;
  public int? SquadId { get; set; }
  public virtual Squad? Squad { get; set; } = null!;
  public int? TeamId { get; set; }
  public virtual Team? Team { get; set; } = null!;
  public int? TribeId { get; set; }
  public virtual Tribe? Tribe { get; set; } = null!;

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  [NotMapped]
  public int? UnitId
  {
    get
    {
      return PracticeId ?? ChapterId ?? SquadId ?? TeamId ?? TribeId;
    }
  }
  [NotMapped]
  public string? UnitType
  {
    get
    {
      if (PracticeId is not null) return "Practice";
      if (ChapterId is not null) return "Chapter";
      if (SquadId is not null) return "Squad";
      if (TeamId is not null) return "Team";
      if (TribeId is not null) return "Tribe";
      return null;
    }
  }
  [NotMapped]
  public string? UnitName
  {
    get
    {
      if (PracticeId is not null) return Practice?.Name;
      if (ChapterId is not null) return Chapter?.Name;
      if (SquadId is not null) return Squad?.Name;
      if (TeamId is not null) return Team?.Name;
      if (TribeId is not null) return Tribe?.Name;
      return null;
    }
  }
}