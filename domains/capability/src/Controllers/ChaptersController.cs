using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Capability.Controllers;

[ApiController]
[Route("practices/{practiceId}/chapters")]
public class ChaptersController : ControllerBase
{
  private readonly IChapterRepository _chapterRepository;
  private readonly IMapper _mapper;
  private readonly ILogger<ChaptersController> _logger;

  public ChaptersController(IChapterRepository chapterRepository, IMapper mapper, ILogger<ChaptersController> logger)
  {
    _chapterRepository = chapterRepository;
    _mapper = mapper;
    _logger = logger;
  }

  // GET: /practices/1/chapters
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var chapters = await _chapterRepository.GetAllChaptersAsync();
    var chaptersDto = _mapper.Map<IEnumerable<ChapterDto>>(chapters);
    return Ok(chaptersDto);
  }

  // GET: /practices/1/chapters/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var chapter = await _chapterRepository.GetChapterWithDetailsAsync(id);
    if (chapter is null) return NotFound();
    var chapterDto = _mapper.Map<ChapterDto>(chapter);
    return Ok(chapterDto);
  }

  // POST: /practices/1/chapters
  [HttpPost]
  public async Task<IActionResult> Create(int practiceId, AddChapterDto chapterDto)
  {
    var chapter = _mapper.Map<Chapter>(chapterDto);
    chapter.PracticeId = practiceId;
    await _chapterRepository.AddChapterAsync(chapter);
    return CreatedAtAction(nameof(Create), new { practiceId = practiceId, id = chapter.Id }, _mapper.Map<ChapterDto>(chapter));
  }

  // PUT: /practices/1/chapters/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int practiceId, int id, UpdateChapterDto chapterDto)
  {
    _logger.LogInformation("Updating chapter {id} for practice {practiceId}", id, practiceId);
    var chapter = _mapper.Map<Chapter>(chapterDto);
    chapter.PracticeId = practiceId;
    chapter.Id = id;
    var updated = await _chapterRepository.UpdateChapterAsync(chapter);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practices/1/chapters/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _chapterRepository.DeleteChapterAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}