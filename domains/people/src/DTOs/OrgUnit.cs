namespace People.DTOs;

public class OrgUnitDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
}

public class MutateOrgUnitDto
{
  public required string Name { get; set; } = string.Empty;
}
