using Org.Entities;

namespace Org.DTOs;

public class ChapterDto : UnitDto
{
  public Practice Practice { get; set; } = null!;
}

public class CreateChapterDto : CreateUnitDto
{
}

public class UpdateChapterDto : UpdateUnitDto
{
}