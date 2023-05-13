namespace Org.DTOs;

public class PersonCollectionDto
{
  public int Id { get; set; }
  public string ExternalId { get; set; } = null!;

  public string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public string LastName { get; set; } = null!;

  public RoleAssignmentCollectionDto? ActiveRoleAssignment { get; set; }
}


public class PersonDto
{
  public int Id { get; set; }
  public string ExternalId { get; set; } = null!;

  public string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public string LastName { get; set; } = null!;

  public RoleAssignmentCollectionDto? ActiveRoleAssignment { get; set; }

  public List<RoleAssignmentDto> RoleAssignments { get; set; } = new();
}

public class CreatePersonDto
{
  public required string ExternalId { get; set; } = null!;

  public required string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public required string LastName { get; set; } = null!;
}

public class UpdatePersonDto
{
  public required string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public required string LastName { get; set; } = null!;
}
