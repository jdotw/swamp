using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace Org.DTOs;

public class UnitAssignmentDto
{
  public int Id { get; set; }
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public int FunctionTypeId { get; set; }
  public virtual FunctionTypeDto FunctionType { get; set; } = null!;
  public int PracticeId { get; set; }
  public virtual PracticeDto Practice { get; set; } = null!;
  public int ChapterId { get; set; }
  public virtual ChapterDto Chapter { get; set; } = null!;
  public int TribeId { get; set; }
  public virtual TribeDto Tribe { get; set; } = null!;
  public int SquadId { get; set; }
  public virtual SquadDto Squad { get; set; } = null!;
  public int TeamId { get; set; }
  public virtual TeamDto Team { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateUnitAssignmentDto
{
  public required int RoleId { get; set; }
  public required int FunctionTypeId { get; set; }
  public int PracticeId { get; set; }
  public int ChapterId { get; set; }
  public int TribeId { get; set; }
  public int SquadId { get; set; }
  public int TeamId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateUnitAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}

