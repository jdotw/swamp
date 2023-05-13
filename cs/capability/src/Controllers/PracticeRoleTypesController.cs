using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Capability.Controllers;

[ApiController]
[Route("/practiceroletypes")]
public class PracticeRoleTypesController : ControllerBase
{
  private readonly IPracticeRoleTypeRepository _repository;
  private readonly IMapper _mapper;

  public PracticeRoleTypesController(IPracticeRoleTypeRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /practiceroletypes
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var types = await _repository.GetAllAsync();
    var typesDto = _mapper.Map<IEnumerable<PracticeRoleTypeDto>>(types);
    return Ok(typesDto);
  }

  // GET: /practiceroletypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var type = await _repository.GetAsync(id);
    if (type is null) return NotFound();
    var typeDto = _mapper.Map<PracticeRoleTypeDto>(type);
    return Ok(typeDto);
  }

  // POST: /practiceroletypes
  [HttpPost]
  public async Task<IActionResult> Create(MutatePracticeRoleTypeDto typeDto)
  {
    var type = _mapper.Map<PracticeRoleType>(typeDto);
    await _repository.AddAsync(type);
    return CreatedAtAction(nameof(Create), new { id = type.Id }, _mapper.Map<PracticeRoleTypeDto>(type));
  }

  // PUT: /practiceroletypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, MutatePracticeRoleTypeDto typeDto)
  {
    var type = _mapper.Map<PracticeRoleType>(typeDto);
    type.Id = id;
    var updated = await _repository.UpdateAsync(type);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practiceroletypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}