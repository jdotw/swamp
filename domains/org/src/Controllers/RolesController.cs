using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/roles")]
public class RolesController : ControllerBase<Role, IRoleRepository>
{
  public RolesController(ILogger<RolesController> logger, IRoleRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roles
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var roles = await Repository.GetAllAsync(ids);
    var rolesDto = Mapper.Map<IEnumerable<RoleCollectionDto>>(roles);
    return Ok(rolesDto);
  }

  // GET: /roles/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var role = await Repository.GetWithDetailsAsync(id);
    if (role is null) return NotFound();
    var roleDto = Mapper.Map<RoleDto>(role);
    return Ok(roleDto);
  }

  // GET: /roles/5/history
  [HttpGet("{id}/history")]
  public async Task<IActionResult> GetHistory(int id)
  {
    var role = await Repository.GetWithDetailsAsync(id);
    if (role is null) return NotFound();
    var history = new List<RoleHistoryItemBase>();
    history.Add(new RoleHistoryOpenedDto
    {
      Date = role.OpenFromDate,
    });
    if (role.ClosedAtDate.HasValue)
    {
      history.Add(new RoleHistoryClosedDto
      {
        Date = role.ClosedAtDate.Value,
      });
    }
    // foreach (var unitAssignment in role.UnitAssignments)
    // {
    //   history.Add(new RoleHistoryUnitAssignmentDto
    //   {
    //     Date = unitAssignment.StartDate,
    //     UnitAssignment = Mapper.Map<UnitAssignmentCollectionDto>(unitAssignment),
    //   });
    // }
    foreach (var levelAssignment in role.LevelAssignments)
    {
      history.Add(new RoleHistoryLevelAssignmentDto
      {
        Date = levelAssignment.StartDate,
        LevelAssignment = Mapper.Map<LevelAssignmentCollectionDto>(levelAssignment),
      });
    }
    foreach (var roleAssignment in role.RoleAssignments)
    {
      history.Add(new RoleHistoryRoleAssignmentDto
      {
        Date = roleAssignment.StartDate,
        RoleAssignment = Mapper.Map<RoleAssignmentCollectionDto>(roleAssignment),
      });
    }
    history = history.OrderBy(p => p.Date).ToList();
    return Ok(history);
  }

  // POST: /roles
  [HttpPost]
  public async Task<IActionResult> Create(CreateRoleDto roleDto)
  {
    var role = Mapper.Map<Role>(roleDto);
    role.LevelAssignments.Add(new LevelAssignment
    {
      LevelId = roleDto.LevelId,
      StartDate = DateTimeOffset.UtcNow
    });
    role.TitleAssignments.Add(new TitleAssignment
    {
      TitleId = roleDto.TitleId,
      StartDate = DateTimeOffset.UtcNow
    });
    await Repository.AddAsync(role);

    var addedRole = await Repository.GetWithDetailsAsync(role.Id);
    var addedRoleDto = Mapper.Map<RoleDto>(addedRole);
    return CreatedAtAction(nameof(Get), new { id = role.Id }, addedRoleDto);
  }

  // PUT: /roles/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateRoleDto roleDto)
  {
    var role = Mapper.Map<Role>(roleDto);
    role.Id = id;
    var updated = await Repository.UpdateAsync(role);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /roles/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }


}

