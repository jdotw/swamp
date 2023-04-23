
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("capabilities")]
public class CapabilitiesController : ControllerBase<Capability, ICapabilitiesRepository>
{
  public CapabilitiesController(ILogger<CapabilitiesController> logger, ICapabilitiesRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /capabilities
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var capabilitys = await Repository.GetAllAsync(ids);
    var capabilitysDto = Mapper.Map<IEnumerable<CapabilityCollectionDto>>(capabilitys);
    return Ok(capabilitysDto);
  }

  // GET: /capabilities/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var capability = await Repository.GetWithDetailsAsync(id);
    if (capability is null) return NotFound();
    var capabilityDto = Mapper.Map<CapabilityDto>(capability);
    return Ok(capabilityDto);
  }

  // // PUT: /capabilities/5
  // [HttpPut("{id}")]
  // public async Task<IActionResult> Update(int id, UpdateCapabilityDto capabilityDto)
  // {
  //   var capability = Mapper.Map<Capability>(capabilityDto);
  //   capability.Id = id;
  //   var updated = await Repository.UpdateAsync(capability);
  //   return (updated > 0) ? NoContent() : NotFound();
  // }
  //
}

[ApiController]
[Route("roles/{roleId}/capabilities")]
public class CapabilitiesByRoleController : ControllerBase<Capability, ICapabilitiesRepository>
{
  public CapabilitiesByRoleController(ILogger<CapabilitiesController> logger, ICapabilitiesRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roles/2/capabilities
  [HttpGet()]
  public async Task<IActionResult> GetAll(int roleId)
  {
    var capabilitys = await Repository.GetAllByRoleIdAsync(roleId, activeOnly: true);
    var capabilitysDto = Mapper.Map<IEnumerable<CapabilityCollectionDto>>(capabilitys);
    return Ok(capabilitysDto);
  }

  // POST: /roles/2/capabilities
  [HttpPost]
  public async Task<IActionResult> Create(int roleId, CreateCapabilityDto capabilityDto)
  {
    capabilityDto.RoleId = roleId;
    var capability = Mapper.Map<Capability>(capabilityDto);
    await Repository.AddAsync(capability);
    var added = await Repository.GetWithDetailsAsync(capability.Id);
    return Created("", Mapper.Map<CapabilityDto>(added));
  }

  // DELETE: /capabilities/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var capability = await Repository.GetByIdAsync(id);
    if (capability is null) return NotFound();
    capability.RetiredAtDate = DateTimeOffset.UtcNow;
    var updated = await Repository.UpdateAsync(capability);
    return (updated > 0) ? NoContent() : NotFound();
  }
}

