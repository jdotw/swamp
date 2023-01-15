using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/tribes")]
public class TribesController : ControllerBase<Tribe, ITribeRepository>
{
  public TribesController(ILogger<TribesController> logger, ITribeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /tribes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var tribes = await Repository.GetAllTribesAsync(ids);
    var tribesDto = Mapper.Map<IEnumerable<TribeDto>>(tribes);
    return Ok(tribesDto);
  }

  // GET: /tribes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var tribe = await Repository.GetTribeWithDetailsAsync(id);
    if (tribe is null) return NotFound();
    var tribeDto = Mapper.Map<TribeDto>(tribe);
    return Ok(tribeDto);
  }

  // POST: /tribes
  [HttpPost]
  public async Task<IActionResult> Create(CreateTribeDto tribeDto)
  {
    var tribe = Mapper.Map<Tribe>(tribeDto);
    await Repository.AddTribeAsync(tribe);
    return CreatedAtAction(nameof(Get), new { id = tribe.Id }, Mapper.Map<TribeDto>(tribe));
  }

  // PUT: /tribes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTribeDto tribeDto)
  {
    var tribe = Mapper.Map<Tribe>(tribeDto);
    tribe.Id = id;
    var updated = await Repository.UpdateTribeAsync(tribe);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteTribeAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

