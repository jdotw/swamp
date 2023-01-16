using Org.Entities;

namespace Org.DTOs;

public class FunctionDto
{
  public int Id { get; set; }

  public int? FunctionTypeId { get; set; }
  public FunctionType? FunctionType { get; set; }
  public string? Name { get; set; }

  public int? TribeId { get; set; }
  public Tribe? Tribe { get; set; }
  public int? SquadId { get; set; }
  public Squad? Squad { get; set; }
  public int? PracticeId { get; set; }
  public Practice? Practice { get; set; }
  public int? ChapterId { get; set; }
  public Chapter? Chapter { get; set; }
  public int? TeamId { get; set; }
  public Team? Team { get; set; }

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  public int RoleId { get; set; }
  public Role Role { get; set; } = null!;
}

public class CreateFunctionDto
{
  public int? FunctionTypeId { get; set; }
  public string? Name { get; set; }

  public int? TribeId { get; set; }
  public int? SquadId { get; set; }
  public int? PracticeId { get; set; }
  public int? ChapterId { get; set; }
  public int? TeamId { get; set; }

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateFunctionDto
{
  public int? FunctionTypeId { get; set; }
  public string? Name { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}