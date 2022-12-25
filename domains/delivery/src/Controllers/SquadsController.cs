using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("[controller]")]
public class SquadsController : ControllerBase
{
  private readonly ISquadRepository _squadRepository;
  private readonly IMapper _mapper;

  public SquadsController(ISquadRepository squadRepository, IMapper mapper)
  {
    _squadRepository = squadRepository;
    _mapper = mapper;
  }

  // GET: api/Squads
  [HttpGet]
  public async Task<IActionResult> GetSquads()
  {
    var squads = await _squadRepository.GetAllSquadsAsync();
    var squadsDto = _mapper.Map<IEnumerable<SquadDto>>(squads);
    return Ok(squadsDto);
  }

  // GET: api/Squads/5
  [HttpGet("{id}")]
  public async Task<IActionResult> GetSquad(int id)
  {
    var squad = await _squadRepository.GetSquadWithDetailsAsync(id);
    if (squad is null)
    {
      return NotFound();
    }
    var squadDto = _mapper.Map<SquadDto>(squad);
    return Ok(squadDto);
  }

  // POST: api/Squads
  [HttpPost]
  public async Task<IActionResult> PostSquad(SquadDto squadDto)
  {
    var squad = _mapper.Map<Squad>(squadDto);
    await _squadRepository.AddSquadAsync(squad);
    return CreatedAtAction("GetSquad", new { id = squad.Id }, _mapper.Map<SquadDto>(squad));
  }

  // PUT: api/Squads/5
  [HttpPut("{id}")]
  public async Task<IActionResult> PutSquad(int id, Squad squadDto)
  {
    if (id != squadDto.Id)
    {
      return BadRequest();
    }

    var squad = _mapper.Map<Squad>(squadDto);
    var updated = await _squadRepository.UpdateSquadAsync(squad);
    if (updated > 0)
    {
      return NoContent();
    }
    else
    {
      return NotFound();
    }
  }

  // DELETE: api/Squads/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteSquad(int id)
  {
    var deleted = await _squadRepository.DeleteSquadAsync(id);
    if (deleted > 0)
    {
      return NoContent();
    }
    else
    {
      return NotFound();
    }
  }
}