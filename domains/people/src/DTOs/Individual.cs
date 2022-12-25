using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace People.DTOs;

public class IndividualIdentifiersDto
{
  public int Id { get; set; }
  public string? ExternalId { get; set; }
}

public class MutateIndividualDto
{
  public required string ExternalId { get; set; } = string.Empty;
  public required string FirstName { get; set; } = string.Empty;
  public required string LastName { get; set; } = string.Empty;
  public string? MiddleNames { get; set; }
}

public class IndividualDto : IndividualIdentifiersDto
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string? MiddleNames { get; set; }
}

public class IdentityDto
{
  public string FirstName { get; set; } = string.Empty;
}
