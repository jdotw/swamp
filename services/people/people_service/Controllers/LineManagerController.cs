using Microsoft.AspNetCore.Mvc;
using People.Entities;
using People.PostgreSQL;
using People.Services;
using Microsoft.EntityFrameworkCore;
using People.Interfaces;
using People.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace People.Controllers;

[ApiController]
[Route("/individuals/{individualId}/line-managers")]
public class LineManagers : ControllerBase
{
  private readonly ILogger<Individuals> logger;
  private readonly ILineManagerService service;
  private readonly IMapper mapper;

  public LineManagers(ILogger<Individuals> logger, ILineManagerService service, IMapper mapper)
  {
    this.logger = logger;
    this.service = service;
    this.mapper = mapper;
  }

  [HttpGet]
  public ActionResult<List<LineManagerDto>> GetAll(int individualId)
  {
    var results = service.GetAll(individualId);
    return (results == null) ? NotFound() : Ok(results);
  }

  [HttpGet("{id}")]
  public ActionResult<LineManagerDto> Get(int individualId, int id)
  {
    var result = service.Get(id);
    return (result == null) ? NotFound() : Ok(result);
  }

  [HttpPost]
  public IActionResult Add(int individualId, AddLineManagerDto manager)
  {
    logger.LogInformation("MANAGER_ID: {0}", manager.ManagerId);
    var result = service.Add(individualId, manager);
    service.SaveAll();
    return CreatedAtAction(nameof(Add), new { id = result.Id }, result);
  }

  [HttpPut("{id}")]
  public IActionResult Update(int id, MutateLineManagerDto manager)
  {
    if (service.Update(id, manager) is { })
    {
      service.SaveAll();
      return NoContent();
    }
    else
    {
      return NotFound();
    }
  }

  [HttpDelete("{id}")]
  public ActionResult Delete(int individualId, int id)
  {
    var success = service.Delete(id);
    return (success == true) ? NoContent() : NotFound();
  }
}

