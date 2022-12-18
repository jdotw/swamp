using System.ComponentModel.DataAnnotations;

namespace People.DTOs;

public class CreateIndividualDto
{
  [Required]
  public string ExternalId { get; set; } = string.Empty;

  [Required]
  public CreateIndividualIdentityDto Identity { get; set; } = new CreateIndividualIdentityDto();
}

public class CreateIndividualIdentityDto
{
  [Required]
  public string FirstName { get; set; } = string.Empty;
  [Required]
  public string LastName { get; set; } = string.Empty;

  public string? MiddleNames { get; set; }
}

public class IndividualDto
{
  public int Id { get; set; }
  public string? ExternalId { get; set; }
  public IdentityDto? Identity { get; set; }
}

public class IdentityDto
{
  public int Id { get; set; }
  public string? FirstName { get; set; }
  public string? MiddleNames { get; set; }
  public string? LastName { get; set; }
}