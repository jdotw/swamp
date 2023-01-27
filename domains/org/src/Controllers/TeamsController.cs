using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/teams")]
public class TeamsController : ControllerBase<Team, ITeamRepository>
{
  public TeamsController(ILogger<TeamsController> logger, ITeamRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /teams
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var teams = await Repository.GetAllAsync(ids);
    var teamsDto = Mapper.Map<IEnumerable<TeamDto>>(teams);
    return Ok(teamsDto);
  }

  // GET: /teams/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var team = await Repository.GetWithDetailsAsync(id);
    if (team is null) return NotFound();
    var teamDto = Mapper.Map<TeamDto>(team);
    return Ok(teamDto);
  }

  // POST: /teams
  [HttpPost]
  public async Task<IActionResult> Create(CreateTeamDto teamDto)
  {
    var team = Mapper.Map<Team>(teamDto);
    await Repository.AddAsync(team);
    return CreatedAtAction(nameof(Get), new { id = team.Id }, Mapper.Map<TeamDto>(team));
  }

  // PUT: /teams/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTeamDto teamDto)
  {
    var team = Mapper.Map<Team>(teamDto);
    team.Id = id;
    var updated = await Repository.UpdateAsync(team);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /teams/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

