using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/persons/{personId}/role_assignments")]
public class PersonRoleAssignmentsController : ControllerBase<RoleAssignment, IRoleAssignmentRepository>
{
  public PersonRoleAssignmentsController(ILogger<RoleAssignmentsController> logger, IRoleAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /persons/1/role_assignments
  [HttpGet()]
  public async Task<IActionResult> GetAll(int personId)
  {
    var assignments = await Repository.GetAllAsync(personId: personId);
    var assignmentsDto = Mapper.Map<IEnumerable<RoleAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /persons/1/role_assignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<RoleAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /persons/1/role_assignments
  [HttpPost]
  public async Task<IActionResult> Create(int personId, CreateRoleAssignmentWithRoleIdDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    assignment.PersonId = personId;
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id, personId = assignment.PersonId }, Mapper.Map<RoleAssignmentDto>(assignment));
  }

  // PUT: /persons/1/role_assignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateRoleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /persons/1/role_assignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

[ApiController]
[Route("/roles/{roleId}/role_assignments")]
public class RoleAssignmentsController : ControllerBase<RoleAssignment, IRoleAssignmentRepository>
{
  public RoleAssignmentsController(ILogger<RoleAssignmentsController> logger, IRoleAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roles/1/role_assignments
  [HttpGet()]
  public async Task<IActionResult> GetAll(int roleId)
  {
    var assignments = await Repository.GetAllByRoleIdAsync(roleId);
    var assignmentsDto = Mapper.Map<IEnumerable<RoleAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /roles/1/role_assignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<RoleAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /roles/1/role_assignments
  [HttpPost]
  public async Task<IActionResult> Create(int roleId, CreateRoleAssignmentWithPersonIdDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    assignment.RoleId = roleId;
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id, roleId = assignment.RoleId }, Mapper.Map<RoleAssignmentDto>(assignment));
  }

  // PUT: /roles/1/role_assignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateRoleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<RoleAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /roles/1/role_assignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

