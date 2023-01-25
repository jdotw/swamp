namespace Org.DTOs;

public class ChapterDto : UnitDto
{
  public PracticeDto Practice { get; set; } = null!;
}

public class CreateChapterDto : CreateUnitDto
{
}

public class UpdateChapterDto : UpdateUnitDto
{
}