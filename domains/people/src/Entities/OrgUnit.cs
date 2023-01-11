using Base.Entities;

namespace People.Entities;

public class OrgUnit : EntityBase
{
  public string? Name { get; set; }
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }

  public OrgUnit()
  {
  }
}