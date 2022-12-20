namespace People.Entities;

public class Individual : BaseEntity
{
  public string? ExternalId { get; set; }

  public List<Identity> Identities { get; set; } = new();

  public Individual()
  {
  }
}