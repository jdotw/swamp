using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/tribes/{tribeId}/squads")]
public class SquadsController : ControllerBase<Squad, ISquadRepository>
{
  public SquadsController(ILogger<SquadsController> logger, ISquadRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /tribes/1/squads
  [HttpGet()]
  public async Task<IActionResult> GetAll(int tribeId, [FromQuery(Name = "id")] List<int>? ids = null)
  {
    var squads = await Repository.GetAllAsync(tribeId, ids);
    var squadsDto = Mapper.Map<IEnumerable<SquadDto>>(squads);
    return Ok(squadsDto);
  }

  // GET: /tribes/1/squads/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var squad = await Repository.GetWithDetailsAsync(id);
    if (squad is null) return NotFound();
    var squadDto = Mapper.Map<SquadDto>(squad);
    return Ok(squadDto);
  }

  // POST: /tribes/1/squads
  [HttpPost]
  public async Task<IActionResult> Create(int tribeId, CreateSquadDto squadDto)
  {
    var squad = Mapper.Map<Squad>(squadDto);
    squad.TribeId = tribeId;
    await Repository.AddAsync(squad);
    return CreatedAtAction(nameof(Get), new { tribeId = tribeId, id = squad.Id }, Mapper.Map<SquadDto>(squad));
  }

  // PUT: /tribes/1/squads/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int tribeId, int id, UpdateSquadDto squadDto)
  {
    var squad = Mapper.Map<Squad>(squadDto);
    squad.TribeId = tribeId;
    squad.Id = id;
    var updated = await Repository.UpdateAsync(squad);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/1/squads/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

