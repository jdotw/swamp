using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/levels")]
public class LevelsController : ControllerBase<Level, ILevelRepository>
{
  public LevelsController(ILogger<LevelsController> logger, ILevelRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /functiontypes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var levels = await Repository.GetAllAsync(ids);
    var levelsDto = Mapper.Map<IEnumerable<LevelDto>>(levels);
    return Ok(levelsDto);
  }

  // GET: /functiontypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var level = await Repository.GetWithDetailsAsync(id);
    if (level is null) return NotFound();
    var levelDto = Mapper.Map<LevelDto>(level);
    return Ok(levelDto);
  }

  // POST: /functiontypes
  [HttpPost]
  public async Task<IActionResult> Create(CreateLevelDto levelDto)
  {
    var level = Mapper.Map<Level>(levelDto);
    await Repository.AddAsync(level);
    return CreatedAtAction(nameof(Get), new { id = level.Id }, Mapper.Map<LevelDto>(level));
  }

  // PUT: /functiontypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateLevelDto levelDto)
  {
    var level = Mapper.Map<Level>(levelDto);
    level.Id = id;
    var updated = await Repository.UpdateAsync(level);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /functiontypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

