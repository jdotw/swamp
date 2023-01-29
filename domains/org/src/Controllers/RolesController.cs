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
    var rolesDto = Mapper.Map<IEnumerable<RoleDto>>(roles);
    for (int i = 0; i < rolesDto.Count(); i++)
    {
      var role = rolesDto.ElementAt(i);
      role.CapabilityUnitAssignment = role.UnitAssignments.Where(u => u.EndDate == null
                                                            && (u.AssignmentType == "practice"
                                                            || u.AssignmentType == "chapter"))
                                                          .OrderBy(u => u.StartDate)
                                                          .FirstOrDefault();
      role.DeliveryUnitAssignment = role.UnitAssignments.Where(u => u.EndDate == null
                                                          && (u.AssignmentType == "squad"
                                                          || u.AssignmentType == "tribe"
                                                          || u.AssignmentType == "team"))
                                                        .OrderBy(u => u.StartDate)
                                                        .FirstOrDefault();
    }

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
    role.LevelAssignments.Add(new LevelAssignment { LevelId = roleDto.LevelId });
    switch (roleDto.UnitType)
    {
      case "squad":
        role.UnitAssignments.Add(new SquadAssignment
        {
          SquadId = roleDto.UnitId,
          FunctionTypeId = roleDto.FunctionTypeId
        });
        break;
      default:
        break;
    }
    await Repository.AddAsync(role);

    var addedRole = await Repository.GetWithDetailsAsync(role.Id);
    return CreatedAtAction(nameof(Get), new { id = role.Id }, Mapper.Map<RoleDto>(addedRole));
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

