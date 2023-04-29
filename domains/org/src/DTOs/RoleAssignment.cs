namespace Org.DTOs;

public class RoleAssignmentDto
{
  public int Id { get; set; }
  public int PersonId { get; set; }
  public virtual PersonDto Person { get; set; } = null!;
  public int RoleId { get; set; }
  public virtual RoleDto Role { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class RoleAssignmentCollectionDto
{
  public int Id { get; set; }
  public int RoleId { get; set; }
  public virtual RoleCollectionDto Role { get; set; } = null!;
  public int PersonId { get; set; }
  public virtual PersonCollectionDto Person { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateRoleAssignmentWithPersonIdDto
{
  public required int PersonId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class CreateRoleAssignmentWithRoleIdDto
{
  public required int RoleId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}


public class UpdateRoleAssignmentDto
{
  public DateTimeOffset? EndDate { get; set; }
}
