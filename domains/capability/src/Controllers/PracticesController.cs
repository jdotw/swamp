using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Capability.Controllers;

[ApiController]
[Route("/practices")]
public class PracticesController : ControllerBase
{
  private readonly IPracticeRepository _practiceRepository;
  private readonly IMapper _mapper;

  public PracticesController(IPracticeRepository practiceRepository, IMapper mapper)
  {
    _practiceRepository = practiceRepository;
    _mapper = mapper;
  }

  // GET: /practices
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var practices = await _practiceRepository.GetAllPracticesAsync();
    var practicesDto = _mapper.Map<IEnumerable<PracticeDto>>(practices);
    return Ok(practicesDto);
  }

  // GET: /practices/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var practice = await _practiceRepository.GetPracticeWithDetailsAsync(id);
    if (practice is null) return NotFound();
    var practiceDto = _mapper.Map<PracticeDto>(practice);
    return Ok(practiceDto);
  }

  // POST: /practices
  [HttpPost]
  public async Task<IActionResult> Create(AddPracticeDto practiceDto)
  {
    var practice = _mapper.Map<Practice>(practiceDto);
    await _practiceRepository.AddPracticeAsync(practice);
    return CreatedAtAction("GetPractice", new { id = practice.Id }, _mapper.Map<PracticeDto>(practice));
  }

  // PUT: /practices/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdatePracticeDto practiceDto)
  {
    var practice = _mapper.Map<Practice>(practiceDto);
    practice.Id = id;
    var updated = await _practiceRepository.UpdatePracticeAsync(practice);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practices/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _practiceRepository.DeletePracticeAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}