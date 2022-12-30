namespace Capability.DTOs;

public class PracticeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public List<ChapterDto> Chapters { get; set; } = new List<ChapterDto>();
  public DateTimeOffset FormedDate { get; set; }
  public DateTimeOffset? DisbandedDate { get; set; }
}
public class AddPracticeDto
{
  public required string Name { get; set; }
  public DateTimeOffset FormedDate { get; set; } = DateTimeOffset.UtcNow;
}

public class UpdatePracticeDto : AddPracticeDto
{
  public DateTimeOffset? DisbandedDate { get; set; }
}
