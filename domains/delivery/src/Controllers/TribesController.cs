using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("[controller]")]
public class TribesController : ControllerBase
{
  private readonly ITribeRepository _tribeRepository;
  private readonly IMapper _mapper;

  public TribesController(ITribeRepository tribeRepository, IMapper mapper)
  {
    _tribeRepository = tribeRepository;
    _mapper = mapper;
  }

  // GET: api/Tribes
  [HttpGet]
  public async Task<IActionResult> GetTribes()
  {
    var tribes = await _tribeRepository.GetAllTribesAsync();
    var tribesDto = _mapper.Map<IEnumerable<TribeDto>>(tribes);
    return Ok(tribesDto);
  }

  // GET: api/Tribes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> GetTribe(int id)
  {
    var tribe = await _tribeRepository.GetTribeWithDetailsAsync(id);
    if (tribe is null)
    {
      return NotFound();
    }
    var tribeDto = _mapper.Map<TribeDto>(tribe);
    return Ok(tribeDto);
  }

  // POST: api/Tribes
  [HttpPost]
  public async Task<IActionResult> PostTribe(AddTribeDto tribeDto)
  {
    var tribe = _mapper.Map<Tribe>(tribeDto);
    await _tribeRepository.AddTribeAsync(tribe);
    return CreatedAtAction("GetTribe", new { id = tribe.Id }, _mapper.Map<TribeDto>(tribe));
  }

  // PUT: api/Tribes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> PutTribe(int id, UpdateTribeDto tribeDto)
  {
    var tribe = _mapper.Map<Tribe>(tribeDto);
    tribe.Id = id;
    var updated = await _tribeRepository.UpdateTribeAsync(tribe);
    if (updated > 0)
    {
      return NoContent();
    }
    else
    {
      return NotFound();
    }
  }

  // DELETE: api/Tribes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteTribe(int id)
  {
    var deleted = await _tribeRepository.DeleteTribeAsync(id);
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