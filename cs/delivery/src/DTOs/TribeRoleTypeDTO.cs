namespace Delivery.DTOs;

public class TribeRoleTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
}

public class MutateTribeRoleTypeDto
{
  public required string Name { get; set; }
}