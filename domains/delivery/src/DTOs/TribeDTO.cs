namespace Delivery.DTOs;

public class TribeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
public class AddTribeDto
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
}

public class UpdateTribeDto : AddTribeDto
{
  public DateTimeOffset? DisbandedDate { get; set; }
}
