using Base.Entities;

namespace People.Entities;

public class Identity : EntityBase
{
  public string? FirstName { get; set; }
  public string? MiddleNames { get; set; }
  public string? LastName { get; set; }

  public int IndividualId { get; set; }

  public Individual? Individual { get; set; }

  public Identity()
  {
  }
}