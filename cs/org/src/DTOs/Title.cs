namespace Org.DTOs;

public class TitleCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public int LevelId { get; set; }
  public LevelCollectionDto Level { get; set; } = null!;
  public int? TrackId { get; set; }
  public TrackCollectionDto? Track { get; set; }
}

public class TitleDto : TitleCollectionDto
{
}

public class UpdateTitleDto
{
  public required string Name { get; set; } = null!;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateTitleDto : UpdateTitleDto
{
  public required int LevelId { get; set; }
  public int? TrackId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
}

