using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("tribes/{tribeId}/squads")]
public class SquadsController : ControllerBase
{
  private readonly ISquadRepository _squadRepository;
  private readonly IMapper _mapper;

  public SquadsController(ISquadRepository squadRepository, IMapper mapper)
  {
    _squadRepository = squadRepository;
    _mapper = mapper;
  }

  // GET: /tribes/1/squads
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var squads = await _squadRepository.GetAllSquadsAsync();
    var squadsDto = _mapper.Map<IEnumerable<SquadDto>>(squads);
    return Ok(squadsDto);
  }

  // GET: /tribes/1/squads/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var squad = await _squadRepository.GetSquadWithDetailsAsync(id);
    if (squad is null) return NotFound();
    var squadDto = _mapper.Map<SquadDto>(squad);
    return Ok(squadDto);
  }

  // POST: /tribes/1/squads
  [HttpPost]
  public async Task<IActionResult> Create(int tribeId, AddSquadDto squadDto)
  {
    var squad = _mapper.Map<Squad>(squadDto);
    squad.TribeId = tribeId;
    await _squadRepository.AddSquadAsync(squad);
    return CreatedAtAction(nameof(Create), new { tribeId = tribeId, id = squad.Id }, _mapper.Map<SquadDto>(squad));
  }

  // PUT: /tribes/1/squads/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateSquadDto squadDto)
  {
    var squad = _mapper.Map<Squad>(squadDto);
    squad.Id = id;
    var updated = await _squadRepository.UpdateSquadAsync(squad);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/1/squads/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _squadRepository.DeleteSquadAsync(id);
    Console.WriteLine($"Deleted {deleted} squad(s) with id={id}.");
    return (deleted > 0) ? NoContent() : NotFound();
  }
}