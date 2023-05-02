namespace Org.DTOs;

public class TrackCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public int ParentId { get; set; }
}

public class TrackDto : TrackCollectionDto
{
  public DeploymentTypeDto? Parent { get; set; }
  public List<DeploymentTypeCollectionDto> Children { get; set; } = new();
}

public class UpdateTrackDto
{
  public required string Name { get; set; } = null!;
  public int? ParentId { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateTrackDto : UpdateTrackDto
{
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
}

