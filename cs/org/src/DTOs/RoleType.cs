namespace Org.DTOs;

public record RoleTypeBaseDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public int ParentId { get; set; }
}

public record RoleTypeCollectionDto : RoleTypeBaseDto
{
  public RoleTypeParentDto? Parent { get; set; }
  public virtual List<RoleTypeCollectionDto> Children { get; set; } = new();
  public virtual List<CapabilityTypeCollectionDto> CapabilityTypes { get; set; } = new();
}

public record RoleTypeParentDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public record RoleTypeDto : RoleTypeCollectionDto
{
  public virtual List<RoleCollectionDto> Roles { get; set; } = new();
}

public record CreateRoleTypeDto
{
  public required string Name { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public record UpdateRoleTypeDto
{
  public required string Name { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}
