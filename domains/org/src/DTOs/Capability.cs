
namespace Org.DTOs;

public class CapabilityDto : CapabilityCollectionDto
{
}

public class CapabilityCollectionDto
{
  public int Id { get; set; }
  public int CapabilityTypeId { get; set; }
  public required CapabilityTypeDto CapabilityType { get; set; }
  public int RoleId { get; set; }
  public required RoleDto Role { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateCapabilityDto : UpdateCapabilityDto
{
  public required int RoleId { get; set; }
  public required int CapabilityTypeId { get; set; }
  public DateTimeOffset? ActiveFromDate { get; set; }
}

public class UpdateCapabilityDto
{
  public DateTimeOffset? RetiredAtDate { get; set; }
}
