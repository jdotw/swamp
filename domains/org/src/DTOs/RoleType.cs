namespace Org.DTOs;

public class RoleTypeDto
{
  public int Id { get; set; }
  public string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateRoleTypeDto
{
  public required string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class UpdateRoleTypeDto
{
  public required string Title { get; set; } = null!;
  public DateTimeOffset? RetiredAtDate { get; set; }
}