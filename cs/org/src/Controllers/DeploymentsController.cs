using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/deployments")]
public class DeploymentsController : ControllerBase<Deployment, IDeploymentRepository>
{
  public DeploymentsController(ILogger<DeploymentsController> logger, IDeploymentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /homeassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var assignments = await Repository.GetAllAsync(ids);
    var assignmentsDto = Mapper.Map<IEnumerable<DeploymentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /homeassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<DeploymentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /homeassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateDeploymentDto assignmentDto)
  {
    var assignment = Mapper.Map<Deployment>(assignmentDto);
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<DeploymentDto>(assignment));
  }

  // PUT: /homeassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateDeploymentDto assignmentDto)
  {
    var assignment = Mapper.Map<Deployment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /homeassignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

