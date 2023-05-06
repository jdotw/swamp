using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/titleassignments")]
public class TitleAssignmentsController : ControllerBase<TitleAssignment, ITitleAssignmentRepository>
{
  public TitleAssignmentsController(ILogger<TitleAssignmentsController> logger, ITitleAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /titleassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var assignments = await Repository.GetAllAsync(ids);
    var assignmentsDto = Mapper.Map<IEnumerable<TitleAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /titleassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<TitleAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /titleassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateTitleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<TitleAssignment>(assignmentDto);
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<TitleAssignmentDto>(assignment));
  }

  // PUT: /titleassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTitleAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<TitleAssignment>(assignmentDto);
    assignment.Id = id;
    var updated = await Repository.UpdateAsync(assignment);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /titleassignments/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

