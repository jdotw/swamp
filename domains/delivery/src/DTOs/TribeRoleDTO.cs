namespace Delivery.DTOs;

public class TribeRoleDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public TribeRoleTypeDto TribeRoleType { get; set; } = null!;
  public TribeDto Tribe { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }
}

public class AddTribeRoleDto
{
  public required int IndividualId { get; set; }
  public required int TribeRoleTypeId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateTribeRoleDto
{
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}