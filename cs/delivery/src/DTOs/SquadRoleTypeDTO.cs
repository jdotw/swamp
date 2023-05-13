namespace Delivery.DTOs;

public class SquadRoleTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
}

public class MutateSquadRoleTypeDto
{
  public required string Name { get; set; }
}