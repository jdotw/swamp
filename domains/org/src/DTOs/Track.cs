namespace Org.DTOs;

public class TrackCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class TrackDto : TrackCollectionDto
{
}

public class CreateTrackDto
{
  public required string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class UpdateTrackDto
{
  public required string Name { get; set; } = null!;
  public DateTimeOffset? RetiredAtDate { get; set; }
}
