using Org.Entities;

namespace Org.DTOs;

public class TeamDto
{
  public required int Id { get; set; }
  public string Name { get; set; } = null!;
  public TeamDto? Parent { get; set; }
  public List<TeamDto> Children { get; set; } = new();
}

public class CreateTeamDto
{
  public required string Name { get; set; } = null!;
  public TeamDto? Parent { get; set; }
}

public class UpdateTeamDto
{
  public string Name { get; set; } = null!;
}
