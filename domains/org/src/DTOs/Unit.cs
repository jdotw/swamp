namespace Org.DTOs;

public class UnitDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public List<UnitAssignmentDto> UnitAssignments { get; set; } = new();
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class CreateUnitDto
{
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class UpdateUnitDto
{
  public string Name { get; set; } = null!;
  public string? Description { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}