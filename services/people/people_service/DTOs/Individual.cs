using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace People.DTOs;

public class IndividualIdentifiersDto
{
  [JsonPropertyName("id")]
  public int Id { get; set; }
  [JsonPropertyName("external_id")]
  public string? ExternalId { get; set; }
}

public class MutateIndividualDto
{
  [JsonPropertyName("external_id")]
  public required string ExternalId { get; set; } = string.Empty;
  [JsonPropertyName("first_name")]
  public required string FirstName { get; set; } = string.Empty;
  [JsonPropertyName("last_name")]
  public required string LastName { get; set; } = string.Empty;
  [JsonPropertyName("middle_names")]
  public string? MiddleNames { get; set; }
}

public class IndividualDto : IndividualIdentifiersDto
{
  [JsonPropertyName("first_name")]
  public string FirstName { get; set; } = string.Empty;
  [JsonPropertyName("last_name")]
  public string LastName { get; set; } = string.Empty;
  [JsonPropertyName("middle_names")]
  public string? MiddleNames { get; set; }
}

public class IdentityDto
{
  [JsonPropertyName("first_name")]
  public string FirstName { get; set; } = string.Empty;
}
