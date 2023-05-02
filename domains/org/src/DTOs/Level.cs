namespace Org.DTOs;

public class LevelDto
{
  public int Id { get; set; }
  public int Index { get; set; }
  public string? ExternalId { get; set; } = null!;
  public string IndividualContributorTitle { get; set; } = null!;
  public string ManagerTitle { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public List<LevelAssignmentDto> LevelAssignments { get; set; } = new();
  public List<TitleDto> Titles { get; set; } = new();
  public int ParentId { get; set; }
  public LevelDto? Parent { get; set; }
  public List<LevelCollectionDto> Children { get; set; } = new();
}

public class LevelCollectionDto
{
  public int Id { get; set; }
  public int Index { get; set; }
  public string? ExternalId { get; set; } = null!;
  public string IndividualContributorTitle { get; set; } = null!;
  public string ManagerTitle { get; set; } = null!;
  public int ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateLevelDto
{
  public required int Index { get; set; }
  public string? ExternalId { get; set; } = null!;
  public string? IndividualContributorTitle { get; set; }
  public string? ManagerTitle { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class UpdateLevelDto
{
  public required int Index { get; set; }
  public string? ExternalId { get; set; } = null!;
  public string? IndividualContributorTitle { get; set; } = null!;
  public string? ManagerTitle { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}
