namespace Org.DTOs;

public record RoleTypeCollectionDto
{
  public int Id { get; set; }
  public string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public RoleTypeParentDto? Parent { get; set; }
  public virtual List<RoleTypeCollectionDto> Children { get; set; } = new();
}

public record RoleTypeParentDto
{
  public int Id { get; set; }
  public string Title { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public record RoleTypeDto : RoleTypeCollectionDto
{
  public virtual List<RoleCollectionDto> Roles { get; set; } = new();
}

public record CreateRoleTypeDto
{
  public required string Title { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public record UpdateRoleTypeDto
{
  public required string Title { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}