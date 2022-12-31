using Microsoft.AspNetCore.Mvc;
using People.Entities;
using People.DTOs;
using AutoMapper;

namespace People.Controllers;

[ApiController]
[Route("/individuals/{individualId}/line-managers")]
public class LineManagers : ControllerBase
{
  private readonly ILogger<Individuals> _logger;
  private readonly IMapper _mapper;
  private readonly ILineManagerRepository _repository;

  public LineManagers(ILogger<Individuals> logger, ILineManagerRepository repository, IMapper mapper)
  {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /individuals/5/line-managers
  [HttpGet]
  public async Task<IActionResult> GetAll(int individualId)
  {
    var lineManagers = await _repository.GetAllLineManagersAsync(individualId);
    var lineManagersDto = _mapper.Map<IEnumerable<LineManagerDto>>(lineManagers);
    return Ok(lineManagersDto);
  }

  // GET: /individuals/5/line-managers/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int individualId, int id)
  {
    var lineManager = await _repository.GetLineManagerByIdAsync(id);
    if (lineManager is null) return NotFound();
    var lineManagerDto = _mapper.Map<LineManagerDto>(lineManager);
    return Ok(lineManagerDto);
  }

  // POST: /individuals/5/line-managers
  [HttpPost]
  public async Task<IActionResult> Create(int individualId, AddLineManagerDto lineManagerDto)
  {
    var lineManager = _mapper.Map<LineManager>(lineManagerDto);
    lineManager.IndividualId = individualId;
    await _repository.AddLineManagerAsync(lineManager);
    return CreatedAtAction(nameof(Create), new { id = lineManager.Id }, _mapper.Map<LineManagerDto>(lineManager));
  }

  // PUT: /individuals/5/line-managers/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateLineManagerDto lineManagerDto)
  {
    var lineManager = _mapper.Map<LineManager>(lineManagerDto);
    lineManager.Id = id;
    var updated = await _repository.UpdateLineManagerAsync(lineManager);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /individuals/5/line-managers/5
  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(int individualId, int id)
  {
    var deleted = await _repository.DeleteLineManagerAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

