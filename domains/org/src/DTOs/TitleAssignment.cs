namespace Org.DTOs;

public class TitleAssignmentDto
{
  public int Id { get; set; }
  public int TitleId { get; set; }
  public virtual TitleDto Title { get; set; } = null!;
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class TitleAssignmentCollectionDto
{
  public int Id { get; set; }
  public int TitleId { get; set; }
  public virtual TitleCollectionDto Title { get; set; } = null!;
  public int RoleId { get; set; }
  public virtual RoleCollectionDto Role { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateTitleAssignmentDto
{
  public required int TitleId { get; set; }
  public required int RoleId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateTitleAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}
