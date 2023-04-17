
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("capabilitytypes")]
public class CapabilityTypesController : ControllerBase<CapabilityType, ICapabilityTypeRepository>
{
  public CapabilityTypesController(ILogger<CapabilityTypesController> logger, ICapabilityTypeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /capabilitytypes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var capabilityTypes = await Repository.GetAllAsync(ids);
    var capabilityTypesDto = Mapper.Map<IEnumerable<CapabilityTypeDto>>(capabilityTypes);
    return Ok(capabilityTypesDto);
  }

  // GET: /capabilitytypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var capabilityType = await Repository.GetWithDetailsAsync(id);
    if (capabilityType is null) return NotFound();
    var capabilityTypeDto = Mapper.Map<CapabilityTypeDto>(capabilityType);
    return Ok(capabilityTypeDto);
  }

  // POST: /capabilitytypes
  [HttpPost]
  public async Task<IActionResult> Create(CreateCapabilityTypeDto capabilityTypeDto)
  {
    var capabilityType = Mapper.Map<CapabilityType>(capabilityTypeDto);
    await Repository.AddAsync(capabilityType);
    return CreatedAtAction(nameof(Get), new { id = capabilityType.Id }, Mapper.Map<CapabilityTypeDto>(capabilityType));
  }

  // PUT: /capabilitytypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateCapabilityTypeDto capabilityTypeDto)
  {
    var capabilityType = Mapper.Map<CapabilityType>(capabilityTypeDto);
    capabilityType.Id = id;
    var updated = await Repository.UpdateAsync(capabilityType);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /capabilitytypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

