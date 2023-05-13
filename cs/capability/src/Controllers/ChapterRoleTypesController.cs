using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Capability.Controllers;

[ApiController]
[Route("/chapterroletypes")]
public class ChapterRoleTypesController : ControllerBase
{
  private readonly IChapterRoleTypeRepository _repository;
  private readonly IMapper _mapper;

  public ChapterRoleTypesController(IChapterRoleTypeRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /chapterroletypes
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var types = await _repository.GetAllAsync();
    var typesDto = _mapper.Map<IEnumerable<ChapterRoleTypeDto>>(types);
    return Ok(typesDto);
  }

  // GET: /chapterroletypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var type = await _repository.GetAsync(id);
    if (type is null) return NotFound();
    var typeDto = _mapper.Map<ChapterRoleTypeDto>(type);
    return Ok(typeDto);
  }

  // POST: /chapterroletypes
  [HttpPost]
  public async Task<IActionResult> Create(MutateChapterRoleTypeDto typeDto)
  {
    var type = _mapper.Map<ChapterRoleType>(typeDto);
    await _repository.AddAsync(type);
    return CreatedAtAction(nameof(Create), new { id = type.Id }, _mapper.Map<ChapterRoleTypeDto>(type));
  }

  // PUT: /chapterroletypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, MutateChapterRoleTypeDto typeDto)
  {
    var type = _mapper.Map<ChapterRoleType>(typeDto);
    type.Id = id;
    var updated = await _repository.UpdateAsync(type);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /chapterroletypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}