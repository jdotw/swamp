using Org.Entities;

namespace Org.DTOs;

public class PersonDto
{
  public int Id { get; set; }
  public string ExternalId { get; set; } = null!;

  public string FirstName { get; set; } = null!;
  public string? MiddleNames { get; set; }
  public string LastName { get; set; } = null!;

  public List<Role>? Roles { get; set; }
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