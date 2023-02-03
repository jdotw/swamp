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

  // POST: /roles
  [HttpPost]
  public async Task<IActionResult> Create(CreateRoleDto roleDto)
  {
    var role = Mapper.Map<Role>(roleDto);
    role.LevelAssignments.Add(new LevelAssignment
    {
      LevelId = roleDto.LevelId
    });
    role.UnitAssignments.Add(new UnitAssignment
    {
      FunctionTypeId = roleDto.FunctionTypeId,
      UnitId = roleDto.UnitId,
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

[ApiController]
[Route("/tribes/{parentId}/squads/{unitId}/roles")]
[Route("/practices/{parentId}/chapters/{unitId}/roles")]
[Route("/tribes/{unitId}/roles")]
[Route("/practices/{unitId}/roles")]
[Route("/teams/{unitId}/roles")]
public class SquadRolesController : ControllerBase<Role, IRoleRepository>
{
  public SquadRolesController(ILogger<RolesController> logger, IRoleRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: [/parent/1]/unit/5/roles
  [HttpGet()]
  public async Task<IActionResult> GetAll(int unitId)
  {
    var roles = await Repository.GetAllAsync(unitId: unitId);
    var rolesDto = Mapper.Map<IEnumerable<RoleCollectionDto>>(roles);
    return Ok(rolesDto);
  }

  // GET: [/parent/1]/unit/5/roles/4
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int roleId)
  {
    var role = await Repository.GetByIdAsync(roleId);
    var roleDto = Mapper.Map<IEnumerable<RoleDto>>(role);
    return Ok(roleDto);
  }

  // POST: [/parent/1]/unit/5/roles
  [HttpPost]
  public async Task<IActionResult> Create(int parentId, int unitId, CreateUnitRoleDto roleDto)
  {
    var role = Mapper.Map<Role>(roleDto);
    role.LevelAssignments.Add(new LevelAssignment
    {
      LevelId = roleDto.LevelId
    });
    role.UnitAssignments.Add(new UnitAssignment
    {
      FunctionTypeId = roleDto.FunctionTypeId,
      UnitId = unitId,
    });
    await Repository.AddAsync(role);

    var addedRole = await Repository.GetWithDetailsAsync(role.Id);
    var addedRoleDto = Mapper.Map<RoleDto>(addedRole);
    return CreatedAtAction(nameof(Get),
      new { parentId = parentId, unitId = unitId, id = role.Id },
      addedRoleDto);
  }

}

