using Org.Entities;

namespace Org.DTOs;

public class TeamDto : UnitDto
{
  public string Purpose { get; set; } = null!;
}

public class CreateTeamDto : CreateUnitDto
{
  public string Purpose { get; set; } = null!;
}

public class UpdateTeamDto : UpdateUnitDto
{
  public string Purpose { get; set; } = null!;
}