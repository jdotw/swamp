namespace Org.DTOs;

public class TribeDto : UnitDto
{
  public List<SquadDto> Squads { get; set; } = new();
}

public class CreateTribeDto : CreateUnitDto
{
}

public class UpdateTribeDto : UpdateUnitDto
{
}