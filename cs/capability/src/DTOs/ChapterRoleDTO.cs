namespace Capability.DTOs;

public class ChapterRoleDtoIndividual
{
  public int Id { get; set; }
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string MiddleNames { get; set; } = null!;
}

public class ChapterRoleDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public ChapterRoleTypeDto ChapterRoleType { get; set; } = null!;
  public ChapterDto Chapter { get; set; } = null!;
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset? EndDate { get; set; }

  // From People service
  public ChapterRoleDtoIndividual Individual { get; set; } = null!;
}

public class AddChapterRoleDto
{
  public required int IndividualId { get; set; }
  public required int ChapterRoleTypeId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

public class UpdateChapterRoleDto
{
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}