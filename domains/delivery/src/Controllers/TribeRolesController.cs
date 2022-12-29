using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("/tribes/{tribeId}/roles")]
public class TribeRolesController : ControllerBase
{
  private readonly ITribeRoleRepository _repository;
  private readonly IMapper _mapper;

  public TribeRolesController(ITribeRoleRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /tribes/1/roles
  [HttpGet]
  public async Task<IActionResult> GetAll(int tribeId)
  {
    var roles = await _repository.GetAllAsync(tribeId);
    var rolesDto = _mapper.Map<IEnumerable<TribeRoleDto>>(roles);
    return Ok(rolesDto);
  }

  // GET: /tribes/1/roles/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int tribeId, int id)
  {
    var role = await _repository.GetDetailsAsync(id);
    if (role is null) return NotFound();
    var roleDto = _mapper.Map<TribeRoleDto>(role);
    return Ok(roleDto);
  }

  // POST: /tribes/1/roles
  [HttpPost]
  public async Task<IActionResult> Create(int tribeId, AddTribeRoleDto roleDto)
  {
    var role = _mapper.Map<TribeRole>(roleDto);
    role.TribeId = tribeId;
    await _repository.AddAsync(role);
    return CreatedAtAction("GetTribe", new { id = role.Id }, _mapper.Map<TribeRoleDto>(role));
  }

  // PUT: /tribes/1/roles/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTribeRoleDto roleDto)
  {
    var role = _mapper.Map<TribeRole>(roleDto);
    role.Id = id;
    var updated = await _repository.UpdateAsync(role);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/1/roles/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}