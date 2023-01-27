using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/practices/{practiceId}/chapters")]
public class ChaptersController : ControllerBase<Chapter, IChapterRepository>
{
  public ChaptersController(ILogger<ChaptersController> logger, IChapterRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /practices/1/chapters
  [HttpGet()]
  public async Task<IActionResult> GetAll(int practiceId, [FromQuery(Name = "id")] List<int>? ids = null)
  {
    var chapters = await Repository.GetAllAsync(practiceId, ids);
    var chaptersDto = Mapper.Map<IEnumerable<ChapterDto>>(chapters);
    return Ok(chaptersDto);
  }

  // GET: /practices/1/chapters/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var chapter = await Repository.GetWithDetailsAsync(id);
    if (chapter is null) return NotFound();
    var chapterDto = Mapper.Map<ChapterDto>(chapter);
    return Ok(chapterDto);
  }

  // POST: /practices/1/chapters
  [HttpPost]
  public async Task<IActionResult> Create(int practiceId, CreateChapterDto chapterDto)
  {
    var chapter = Mapper.Map<Chapter>(chapterDto);
    chapter.PracticeId = practiceId;
    await Repository.AddAsync(chapter);
    return CreatedAtAction(nameof(Get), new { practiceId = practiceId, id = chapter.Id }, Mapper.Map<ChapterDto>(chapter));
  }

  // PUT: /practices/1/chapters/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int practiceId, int id, UpdateChapterDto chapterDto)
  {
    var chapter = Mapper.Map<Chapter>(chapterDto);
    chapter.PracticeId = practiceId;
    chapter.Id = id;
    var updated = await Repository.UpdateAsync(chapter);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practices/1/chapters/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

