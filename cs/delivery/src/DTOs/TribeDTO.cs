namespace Delivery.DTOs;

public class TribeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public List<SquadDto> Squads { get; set; } = new List<SquadDto>();
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
public class AddTribeDto
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
}

public class UpdateTribeDto
{
  public required string Name { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
