using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("/tribes")]
public class TribesController : ControllerBase
{
  private readonly ITribeRepository _tribeRepository;
  private readonly IMapper _mapper;

  public TribesController(ITribeRepository tribeRepository, IMapper mapper)
  {
    _tribeRepository = tribeRepository;
    _mapper = mapper;
  }

  // GET: /tribes
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var tribes = await _tribeRepository.GetAllTribesAsync();
    var tribesDto = _mapper.Map<IEnumerable<TribeDto>>(tribes);
    return Ok(tribesDto);
  }

  // GET: /tribes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var tribe = await _tribeRepository.GetTribeWithDetailsAsync(id);
    if (tribe is null) return NotFound();
    var tribeDto = _mapper.Map<TribeDto>(tribe);
    return Ok(tribeDto);
  }

  // POST: /tribes
  [HttpPost]
  public async Task<IActionResult> Create(AddTribeDto tribeDto)
  {
    var tribe = _mapper.Map<Tribe>(tribeDto);
    await _tribeRepository.AddTribeAsync(tribe);
    return CreatedAtAction(nameof(Create), new { id = tribe.Id }, _mapper.Map<TribeDto>(tribe));
  }

  // PUT: /tribes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTribeDto tribeDto)
  {
    var tribe = _mapper.Map<Tribe>(tribeDto);
    tribe.Id = id;
    var updated = await _tribeRepository.UpdateTribeAsync(tribe);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _tribeRepository.DeleteTribeAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}