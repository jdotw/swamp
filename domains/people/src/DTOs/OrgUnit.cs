namespace People.DTOs;

public class OrgUnitDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class MutateOrgUnitDto
{
  public required string Name { get; set; } = string.Empty;
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }
}
