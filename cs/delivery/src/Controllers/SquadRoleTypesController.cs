using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("/squadroletypes")]
public class SquadRoleTypesController : ControllerBase
{
  private readonly ISquadRoleTypeRepository _repository;
  private readonly IMapper _mapper;

  public SquadRoleTypesController(ISquadRoleTypeRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /squadroletypes
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var types = await _repository.GetAllAsync();
    var typesDto = _mapper.Map<IEnumerable<SquadRoleTypeDto>>(types);
    return Ok(typesDto);
  }

  // GET: /squadroletypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var type = await _repository.GetAsync(id);
    if (type is null) return NotFound();
    var typeDto = _mapper.Map<SquadRoleTypeDto>(type);
    return Ok(typeDto);
  }

  // POST: /squadroletypes
  [HttpPost]
  public async Task<IActionResult> Create(MutateSquadRoleTypeDto typeDto)
  {
    var type = _mapper.Map<SquadRoleType>(typeDto);
    await _repository.AddAsync(type);
    return CreatedAtAction(nameof(Create), new { id = type.Id }, _mapper.Map<SquadRoleTypeDto>(type));
  }

  // PUT: /squadroletypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, MutateSquadRoleTypeDto typeDto)
  {
    var type = _mapper.Map<SquadRoleType>(typeDto);
    type.Id = id;
    var updated = await _repository.UpdateAsync(type);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /squadroletypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}