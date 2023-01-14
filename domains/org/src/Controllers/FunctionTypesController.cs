using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/functiontypes")]
public class FunctionTypesController : ControllerBase<FunctionType, IFunctionTypeRepository>
{
  public FunctionTypesController(ILogger<FunctionTypesController> logger, IFunctionTypeRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /functiontypes
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var functionTypes = await Repository.GetAllFunctionTypesAsync(ids);
    var functionTypesDto = Mapper.Map<IEnumerable<FunctionTypeDto>>(functionTypes);
    return Ok(functionTypesDto);
  }

  // GET: /functiontypes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var functionType = await Repository.GetFunctionTypeWithDetailsAsync(id);
    if (functionType is null) return NotFound();
    var functionTypeDto = Mapper.Map<FunctionTypeDto>(functionType);
    return Ok(functionTypeDto);
  }

  // POST: /functiontypes
  [HttpPost]
  public async Task<IActionResult> Create(CreateFunctionTypeDto functionTypeDto)
  {
    var functionType = Mapper.Map<FunctionType>(functionTypeDto);
    await Repository.AddFunctionTypeAsync(functionType);
    return CreatedAtAction(nameof(Get), new { id = functionType.Id }, Mapper.Map<FunctionTypeDto>(functionType));
  }

  // PUT: /functiontypes/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateFunctionTypeDto functionTypeDto)
  {
    var functionType = Mapper.Map<FunctionType>(functionTypeDto);
    functionType.Id = id;
    var updated = await Repository.UpdateFunctionTypeAsync(functionType);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /functiontypes/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteFunctionTypeAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

