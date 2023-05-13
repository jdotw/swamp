namespace Org.DTOs;

public class ManagerAssignmentDto
{
  public int Id { get; set; }
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public int ManagerId { get; set; }
  public virtual RoleDto Manager { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class ManagerAssignmentCollectionDto : ManagerAssignmentDto
{
  public new RoleCollectionDto Role { get; set; } = null!;
  public new RoleCollectionDto Manager { get; set; } = null!;
}

public class UpdateManagerAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateManagerAssignmentDto : UpdateManagerAssignmentDto
{
  public required int RoleId { get; set; }
  public required int ManagerId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
}

