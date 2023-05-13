namespace Capability.DTOs;

public class ChapterRoleTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
}

public class MutateChapterRoleTypeDto
{
  public required string Name { get; set; }
}