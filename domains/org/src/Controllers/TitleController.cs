using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/titles")]
public class TitlesController : ControllerBase<Title, ITitleRepository>
{
  public TitlesController(ILogger<TitlesController> logger, ITitleRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /titles
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var titles = await Repository.GetAllAsync(ids);
    var titlesDto = Mapper.Map<IEnumerable<TitleDto>>(titles);
    return Ok(titlesDto);
  }

  // GET: /titles/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var title = await Repository.GetWithDetailsAsync(id);
    if (title is null) return NotFound();
    var titleDto = Mapper.Map<TitleDto>(title);
    return Ok(titleDto);
  }

  // POST: /titles
  [HttpPost]
  public async Task<IActionResult> Create(CreateTitleDto titleDto)
  {
    var title = Mapper.Map<Title>(titleDto);
    await Repository.AddAsync(title);
    var addedTitle = await Repository.GetWithDetailsAsync(title.Id);
    return CreatedAtAction(nameof(Get), new { id = title.Id }, Mapper.Map<TitleDto>(addedTitle));
  }

  // PUT: /titles/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTitleDto titleDto)
  {
    var title = Mapper.Map<Title>(titleDto);
    title.Id = id;
    var updated = await Repository.UpdateAsync(title);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /titles/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

