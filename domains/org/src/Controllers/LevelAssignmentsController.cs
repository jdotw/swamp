using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/levelassignments")]
public class LevelAssignmentsController : ControllerBase<LevelAssignment, ILevelAssignmentRepository>
{
  public LevelAssignmentsController(ILogger<LevelAssignmentsController> logger, ILevelAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /levelassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var assignments = await Repository.GetAllAsync(ids);
    var assignmentsDto = Mapper.Map<IEnumerable<LevelAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /levelassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<LevelAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /levelassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateLevelAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<LevelAssignment>(assignmentDto);
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<LevelAssignmentDto>(assignment));
  }

  // PUT: /levelassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateLevelAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<LevelAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /levelassignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

