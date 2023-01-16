using Org.Entities;

namespace Org.DTOs;

public class RoleDto
{
  public int Id { get; set; }

  public int PersonId { get; set; }
  public Person? Person { get; set; }

  public int? RoleTypeId { get; set; }
  public RoleType? RoleType { get; set; }

  public string? Title { get; set; }

  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  public List<Function> Functions { get; set; } = new();
}

public class CreateRoleDto
{
  public required int PersonId { get; set; }
  public int? RoleTypeId { get; set; }
  public string? Title { get; set; }
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateRoleDto
{
  public int? RoleTypeId { get; set; }
  public string? Title { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}