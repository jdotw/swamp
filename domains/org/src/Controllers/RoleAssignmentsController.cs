using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/roleassignments")]
public class RoleAssignmentsController : ControllerBase<RoleAssignment, IRoleAssignmentRepository>
{
  public RoleAssignmentsController(ILogger<RoleAssignmentsController> logger, IRoleAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roleassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var assignments = await Repository.GetAllAsync(ids);
    var assignmentsDto = Mapper.Map<IEnumerable<RoleAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /roleassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<RoleAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /roleassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateRoleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<RoleAssignmentDto>(assignment));
  }

  // PUT: /roleassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateRoleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /roleassignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

