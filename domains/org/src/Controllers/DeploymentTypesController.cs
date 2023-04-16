
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("deploymenttypes")]
public class DeploymentTypesController : ControllerBase<DeploymentType, IDeploymentTypeRepository>
{
  public DeploymentTypesController(ILogger<DeploymentTypesController> logger, IDeploymentTypeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: deploymenttypes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var deploymentTypes = await Repository.GetAllAsync(ids);
    var deploymentTypesDto = Mapper.Map<IEnumerable<DeploymentTypeDto>>(deploymentTypes);
    return Ok(deploymentTypesDto);
  }

  // GET: deploymenttypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var deploymentType = await Repository.GetWithDetailsAsync(id);
    if (deploymentType is null) return NotFound();
    var deploymentTypeDto = Mapper.Map<DeploymentTypeDto>(deploymentType);
    return Ok(deploymentTypeDto);
  }

  // POST: deploymenttypes
  [HttpPost]
  public async Task<IActionResult> Create(CreateDeploymentTypeDto deploymentTypeDto)
  {
    var deploymentType = Mapper.Map<DeploymentType>(deploymentTypeDto);
    await Repository.AddAsync(deploymentType);
    return CreatedAtAction(nameof(Get), new { id = deploymentType.Id }, Mapper.Map<DeploymentTypeDto>(deploymentType));
  }

  // PUT: deploymenttypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateDeploymentTypeDto deploymentTypeDto)
  {
    var deploymentType = Mapper.Map<DeploymentType>(deploymentTypeDto);
    deploymentType.Id = id;
    var updated = await Repository.UpdateAsync(deploymentType);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: deploymenttypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

