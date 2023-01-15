using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/practices")]
public class PracticesController : ControllerBase<Practice, IPracticeRepository>
{
  public PracticesController(ILogger<PracticesController> logger, IPracticeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /practices
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var practices = await Repository.GetAllPracticesAsync(ids);
    var practicesDto = Mapper.Map<IEnumerable<PracticeDto>>(practices);
    return Ok(practicesDto);
  }

  // GET: /practices/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var practice = await Repository.GetPracticeWithDetailsAsync(id);
    if (practice is null) return NotFound();
    var practiceDto = Mapper.Map<PracticeDto>(practice);
    return Ok(practiceDto);
  }

  // POST: /practices
  [HttpPost]
  public async Task<IActionResult> Create(CreatePracticeDto practiceDto)
  {
    var practice = Mapper.Map<Practice>(practiceDto);
    await Repository.AddPracticeAsync(practice);
    return CreatedAtAction(nameof(Get), new { id = practice.Id }, Mapper.Map<PracticeDto>(practice));
  }

  // PUT: /practices/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdatePracticeDto practiceDto)
  {
    var practice = Mapper.Map<Practice>(practiceDto);
    practice.Id = id;
    var updated = await Repository.UpdatePracticeAsync(practice);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practices/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeletePracticeAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

