namespace Org.DTOs;

public class SquadDto : UnitDto
{
  public TribeDto Tribe { get; set; } = null!;
}

public class CreateSquadDto : CreateUnitDto
{
}

public class UpdateSquadDto : UpdateUnitDto
{
}