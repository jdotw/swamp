namespace Delivery.DTOs;

public class SquadRoleDtoIndividual
{
  public int Id { get; set; }
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string MiddleNames { get; set; } = null!;
}

public class SquadRoleDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public SquadRoleTypeDto SquadRoleType { get; set; } = null!;
  public SquadDto Squad { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  // From People service
  public SquadRoleDtoIndividual Individual { get; set; } = null!;
}

public class AddSquadRoleDto
{
  public required int IndividualId { get; set; }
  public required int SquadRoleTypeId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateSquadRoleDto
{
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}