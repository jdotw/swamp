using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/managerassignments")]
public class ManagerAssignmentsController : ControllerBase<ManagerAssignment, IManagerAssignmentRepository>
{
  public ManagerAssignmentsController(ILogger<ManagerAssignmentsController> logger, IManagerAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /managerassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null, [FromQuery(Name = "role_id")] int? roleId = 0)
  {
    IEnumerable<ManagerAssignment> assignments;
    if (roleId > 0)
    {
      assignments = await Repository.GetAllByRoleIdAsync(roleId.Value);
    }
    else
    {
      assignments = await Repository.GetAllAsync(ids);
    }
    var assignmentsDto = Mapper.Map<IEnumerable<ManagerAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /managerassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<ManagerAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /managerassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateManagerAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<ManagerAssignment>(assignmentDto);
    var changed = await Repository.AddAsync(assignment);
    if (changed < 1) return BadRequest();
    var createdAssignment = await Repository.GetWithDetailsAsync(assignment.Id);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<ManagerAssignmentDto>(createdAssignment));
  }

  // PUT: /managerassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateManagerAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<ManagerAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /managerassignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

