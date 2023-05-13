namespace Delivery.DTOs;

public class TribeRoleDtoIndividual
{
  public int Id { get; set; }
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string MiddleNames { get; set; } = null!;
}

public class TribeRoleDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public TribeRoleTypeDto TribeRoleType { get; set; } = null!;
  public TribeDto Tribe { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  // From People service
  public TribeRoleDtoIndividual Individual { get; set; } = null!;
}

public class AddTribeRoleDto
{
  public required int IndividualId { get; set; }
  public required int TribeRoleTypeId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateTribeRoleDto
{
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}