
namespace Org.DTOs;

public class TeamDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public string Type { get; set; } = null!;
  public int? ParentId { get; set; }
  public TeamDto? Parent { get; set; }
  public List<TeamDto> Children { get; set; } = new();
}

public class TeamCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public string Type { get; set; } = null!;
  public int? ParentId { get; set; }
  public List<TeamDto> Children { get; set; } = new();
}

public class CreateTeamDto
{
  public required string Name { get; set; }
  public string? Description { get; set; }
  public required string Type { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset FormedAtDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedAtDate { get; set; }
}

public class UpdateTeamDto
{
  public required string Name { get; set; }
  public string? Description { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset? DisbandedAtDate { get; set; }
}
