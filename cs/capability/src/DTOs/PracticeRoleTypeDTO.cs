namespace Capability.DTOs;

public class PracticeRoleTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
}

public class MutatePracticeRoleTypeDto
{
  public required string Name { get; set; }
}