
namespace Org.DTOs;

public class CapabilityTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public int ParentId { get; set; }
  public CapabilityTypeDto? Parent { get; set; }
  public List<CapabilityTypeCollectionDto> Children { get; set; } = new();
  public int RoleTypeId { get; set; }
  public RoleTypeDto? RoleType { get; set; }
}

public class CapabilityTypeCollectionDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public int ParentId { get; set; }
  public int RoleTypeId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public RoleTypeBaseDto? RoleType { get; set; }
}

public class CreateCapabilityTypeDto : UpdateCapabilityTypeDto
{
}

public class UpdateCapabilityTypeDto
{
  public required string Name { get; set; }
  public int? ParentId { get; set; }
  public int? RoleTypeId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}
