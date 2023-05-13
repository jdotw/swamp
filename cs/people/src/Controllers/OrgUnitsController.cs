using Microsoft.AspNetCore.Mvc;
using People.Entities;
using People.Repository;
using People.DTOs;
using AutoMapper;

namespace People.Controllers;

[ApiController]
[Route("/orgunits")]
public class OrgUnitsController : ControllerBase
{
  private readonly ILogger<OrgUnitsController> _logger;
  private readonly IOrgUnitRepository _repository;
  private readonly IMapper _mapper;

  public OrgUnitsController(ILogger<OrgUnitsController> logger, IOrgUnitRepository repository, IMapper mapper)
  {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /orgunits
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var orgUnits = await _repository.GetAllOrgUnitsAsync(ids);
    var orgUnitsDto = _mapper.Map<IEnumerable<OrgUnitDto>>(orgUnits);
    return Ok(orgUnitsDto);
  }

  // GET: /orgunits/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var orgUnit = await _repository.GetOrgUnitWithDetailsAsync(id);
    if (orgUnit is null) return NotFound();
    var orgUnitDto = _mapper.Map<OrgUnitDto>(orgUnit);
    return Ok(orgUnitDto);
  }

  // POST: /orgunits
  [HttpPost]
  public async Task<IActionResult> Create(MutateOrgUnitDto orgUnitDto)
  {
    var orgUnit = _mapper.Map<OrgUnit>(orgUnitDto);
    await _repository.AddOrgUnitAsync(orgUnit);
    return CreatedAtAction(nameof(Create), new { id = orgUnit.Id }, _mapper.Map<OrgUnitDto>(orgUnit));
  }

  // PUT: /orgunits/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, MutateOrgUnitDto orgUnitDto)
  {
    var orgUnit = _mapper.Map<OrgUnit>(orgUnitDto);
    orgUnit.Id = id;
    var updated = await _repository.UpdateOrgUnitAsync(orgUnit);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /orgunits/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteOrgUnitAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

