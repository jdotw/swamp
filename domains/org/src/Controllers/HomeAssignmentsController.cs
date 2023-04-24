using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/homeassignments")]
public class HomeAssignmentsController : ControllerBase<HomeAssignment, IHomeAssignmentRepository>
{
  public HomeAssignmentsController(ILogger<HomeAssignmentsController> logger, IHomeAssignmentRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /homeassignments
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var assignments = await Repository.GetAllAsync(ids);
    var assignmentsDto = Mapper.Map<IEnumerable<HomeAssignmentDto>>(assignments);
    return Ok(assignmentsDto);
  }

  // GET: /homeassignments/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var assignment = await Repository.GetWithDetailsAsync(id);
    if (assignment is null) return NotFound();
    var assignmentDto = Mapper.Map<HomeAssignmentDto>(assignment);
    return Ok(assignmentDto);
  }

  // POST: /homeassignments
  [HttpPost]
  public async Task<IActionResult> Create(CreateHomeAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<HomeAssignment>(assignmentDto);
    await Repository.AddAsync(assignment);
    return CreatedAtAction(nameof(Get), new { id = assignment.Id }, Mapper.Map<HomeAssignmentDto>(assignment));
  }

  // PUT: /homeassignments/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateHomeAssignmentDto assignmentDto)
  {
    var assignment = Mapper.Map<HomeAssignment>(assignmentDto);
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

