namespace Org.DTOs;

public class LevelDto : LevelCollectionDto
{
  public List<LevelAssignmentDto> LevelAssignments { get; set; } = new();
  public List<TitleDto> Titles { get; set; } = new();
  public LevelDto? Parent { get; set; }
  public List<LevelCollectionDto> Children { get; set; } = new();
}

public class LevelCollectionDto
{
  public int Id { get; set; }
  public int Index { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? ExternalId { get; set; }
  public int ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateLevelDto : UpdateLevelDto
{
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
}

public class UpdateLevelDto
{
  public required int Index { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? ExternalId { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}
