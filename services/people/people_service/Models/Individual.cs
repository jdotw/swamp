namespace Entity.Models;

public class Individual
{
  public int Id { get; set; }
  public string? ExternalId { get; set; }

  public List<Identity> Identities { get; set; } = new();

  public Individual()
  {
  }
}