using Org.Entities;

namespace Org.DTOs;

public class SquadDto : UnitDto
{
  public Tribe Tribe { get; set; } = null!;
}

public class CreateSquadDto : CreateUnitDto
{
}

public class UpdateSquadDto : UpdateUnitDto
{
}