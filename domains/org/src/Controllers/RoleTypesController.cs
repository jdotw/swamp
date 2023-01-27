using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/roletypes")]
public class RoleTypesController : ControllerBase<RoleType, IRoleTypeRepository>
{
  public RoleTypesController(ILogger<RoleTypesController> logger, IRoleTypeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roletypes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var roleTypes = await Repository.GetAllAsync(ids);
    var roleTypesDto = Mapper.Map<IEnumerable<RoleTypeDto>>(roleTypes);
    return Ok(roleTypesDto);
  }

  // GET: /roletypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var roleType = await Repository.GetWithDetailsAsync(id);
    if (roleType is null) return NotFound();
    var roleTypeDto = Mapper.Map<RoleTypeDto>(roleType);
    return Ok(roleTypeDto);
  }

  // POST: /roletypes
  [HttpPost]
  public async Task<IActionResult> Create(CreateRoleTypeDto roleTypeDto)
  {
    var roleType = Mapper.Map<RoleType>(roleTypeDto);
    await Repository.AddAsync(roleType);
    return CreatedAtAction(nameof(Get), new { id = roleType.Id }, Mapper.Map<RoleTypeDto>(roleType));
  }

  // PUT: /roletypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateRoleTypeDto roleTypeDto)
  {
    var roleType = Mapper.Map<RoleType>(roleTypeDto);
    roleType.Id = id;
    var updated = await Repository.UpdateAsync(roleType);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /roletypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

