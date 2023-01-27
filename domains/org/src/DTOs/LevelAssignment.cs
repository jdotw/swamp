namespace Org.DTOs;

public class LevelAssignmentDto
{
  public int Id { get; set; }
  public int LevelId { get; set; }
  public virtual LevelDto Level { get; set; } = null!;
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateLevelAssignmentDto
{
  public required int LevelId { get; set; }
  public required int RoleId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateLevelAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}