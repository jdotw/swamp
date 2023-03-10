namespace People.DTOs;

public class IndividualDto
{
  public int Id { get; set; }
  public string? ExternalId { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string? MiddleNames { get; set; }
}

public class CreateIndividualDto
{
  public required string ExternalId { get; set; }
  public required string FirstName { get; set; } = string.Empty;
  public required string LastName { get; set; } = string.Empty;
  public string? MiddleNames { get; set; }
}

public class UpdateIndividualDto
{
  public required string FirstName { get; set; } = string.Empty;
  public required string LastName { get; set; } = string.Empty;
  public string? MiddleNames { get; set; }
}
