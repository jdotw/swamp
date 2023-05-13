using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers;

[ApiController]
[Route("/triberoletypes")]
public class TribeRoleTypesController : ControllerBase
{
  private readonly ITribeRoleTypeRepository _repository;
  private readonly IMapper _mapper;

  public TribeRoleTypesController(ITribeRoleTypeRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /triberoletypes
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var types = await _repository.GetAllAsync();
    var typesDto = _mapper.Map<IEnumerable<TribeRoleTypeDto>>(types);
    return Ok(typesDto);
  }

  // GET: /triberoletypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var type = await _repository.GetAsync(id);
    if (type is null) return NotFound();
    var typeDto = _mapper.Map<TribeRoleTypeDto>(type);
    return Ok(typeDto);
  }

  // POST: /triberoletypes
  [HttpPost]
  public async Task<IActionResult> Create(MutateTribeRoleTypeDto typeDto)
  {
    var type = _mapper.Map<TribeRoleType>(typeDto);
    await _repository.AddAsync(type);
    return CreatedAtAction(nameof(Create), new { id = type.Id }, _mapper.Map<TribeRoleTypeDto>(type));
  }

  // PUT: /triberoletypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, MutateTribeRoleTypeDto typeDto)
  {
    var type = _mapper.Map<TribeRoleType>(typeDto);
    type.Id = id;
    var updated = await _repository.UpdateAsync(type);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /triberoletypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}