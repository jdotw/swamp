
namespace Org.DTOs;

public class TeamCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public string Type { get; set; } = null!;
  public int? ParentId { get; set; }
  public List<TeamDto> Children { get; set; } = new();
  public DateTimeOffset FormedAtDate { get; set; }
  public DateTimeOffset? DisbandedAtDate { get; set; }
}

public class TeamDto : TeamCollectionDto
{
  public TeamDto? Parent { get; set; }
}

public class CreateTeamDto : UpdateTeamDto
{
  public required string Type { get; set; }
  public DateTimeOffset FormedAtDate { get; set; } = DateTimeOffset.UtcNow;
}

public class UpdateTeamDto
{
  public required string Name { get; set; }
  public string? Description { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset? DisbandedAtDate { get; set; }
}
