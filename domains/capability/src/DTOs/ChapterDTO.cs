namespace Capability.DTOs;

public class ChapterDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class AddChapterDto
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? DisbandedDate { get; set; }
}

public class UpdateChapterDto
{
  public required string Name { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}