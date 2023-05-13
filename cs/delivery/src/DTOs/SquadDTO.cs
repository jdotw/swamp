namespace Delivery.DTOs;

public class SquadDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class AddSquadDto
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class UpdateSquadDto
{
  public required string Name { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}