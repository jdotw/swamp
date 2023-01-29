using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace Org.DTOs;

[JsonDerivedType(typeof(UnitAssignmentDto))]
[JsonDerivedType(typeof(PracticeAssignmentDto))]
[JsonDerivedType(typeof(ChapterAssignmentDto))]
[JsonDerivedType(typeof(TribeAssignmentDto))]
[JsonDerivedType(typeof(SquadAssignmentDto))]
[JsonDerivedType(typeof(TeamAssignmentDto))]
public class UnitAssignmentDto
{
  public string AssignmentType { get; set; } = null!;
  public int Id { get; set; }
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public virtual FunctionTypeDto FunctionType { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateUnitAssignmentDto
{
  public required int RoleId { get; set; }
  public required int FunctionTypeId { get; set; }
  public required int UnitId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateUnitAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}

public class PracticeAssignmentDto : UnitAssignmentDto
{
  public int PracticeId { get; set; }
  public virtual PracticeDto Practice { get; set; } = null!;
}

public class ChapterAssignmentDto : UnitAssignmentDto
{
  public int ChapterId { get; set; }
  public virtual ChapterDto Chapter { get; set; } = null!;
}

public class TribeAssignmentDto : UnitAssignmentDto
{
  public int TribeId { get; set; }
  public virtual TribeDto Tribe { get; set; } = null!;
}

public class SquadAssignmentDto : UnitAssignmentDto
{
  public int SquadId { get; set; }
  public virtual SquadDto Squad { get; set; } = null!;
}

public class TeamAssignmentDto : UnitAssignmentDto
{
  public int TeamId { get; set; }
  public virtual TeamDto Team { get; set; } = null!;
}

