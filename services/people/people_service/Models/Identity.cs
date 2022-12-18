using System.Text.Json.Serialization;

namespace People.Models;
public class Identity
{
  public int Id { get; set; }
  public string? FirstName { get; set; }
  public string? MiddleNames { get; set; }
  public string? LastName { get; set; }

  public int IndividualId { get; set; }

  public Individual? Individual { get; set; }

  public Identity()
  {
  }
}