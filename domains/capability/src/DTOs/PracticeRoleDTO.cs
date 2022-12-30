namespace Capability.DTOs;

public class PracticeRoleDtoIndividual
{
  public int Id { get; set; }
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string MiddleNames { get; set; } = null!;
}

public class PracticeRoleDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public PracticeRoleTypeDto PracticeRoleType { get; set; } = null!;
  public PracticeDto Practice { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  // From People service
  public PracticeRoleDtoIndividual Individual { get; set; } = null!;
}

public class AddPracticeRoleDto
{
  public required int IndividualId { get; set; }
  public required int PracticeRoleTypeId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdatePracticeRoleDto
{
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}