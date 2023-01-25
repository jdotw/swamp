namespace Org.DTOs;

public class PracticeDto : UnitDto
{
  public List<ChapterDto> Chapters { get; set; } = new();
}

public class CreatePracticeDto : CreateUnitDto
{
}

public class UpdatePracticeDto : UpdateUnitDto
{
}