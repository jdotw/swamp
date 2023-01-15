using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/roles/{roleId}/functions")]
public class FunctionsController : ControllerBase<Function, IFunctionRepository>
{
  public FunctionsController(ILogger<FunctionsController> logger, IFunctionRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /roles/1/functions
  [HttpGet()]
  public async Task<IActionResult> GetAll(int roleId, [FromQuery(Name = "id")] List<int>? ids = null)
  {
    var functions = await Repository.GetAllFunctionsAsync(roleId, ids);
    var functionsDto = Mapper.Map<IEnumerable<FunctionDto>>(functions);
    return Ok(functionsDto);
  }

  // GET: /roles/1/functions/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var function = await Repository.GetFunctionWithDetailsAsync(id);
    if (function is null) return NotFound();
    var functionDto = Mapper.Map<FunctionDto>(function);
    return Ok(functionDto);
  }

  // POST: /roles/1/functions
  [HttpPost]
  public async Task<IActionResult> Create(int roleId, CreateFunctionDto functionDto)
  {
    var function = Mapper.Map<Function>(functionDto);
    function.RoleId = roleId;
    await Repository.AddFunctionAsync(function);
    return CreatedAtAction(nameof(Get), new { roleId = roleId, id = function.Id }, Mapper.Map<FunctionDto>(function));
  }

  // PUT: /roles/1/functions/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int roleId, int id, UpdateFunctionDto functionDto)
  {
    var function = Mapper.Map<Function>(functionDto);
    function.Id = id;
    function.RoleId = roleId;
    var updated = await Repository.UpdateFunctionAsync(function);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /roles/1/functions/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteFunctionAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

