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
[Route("[controller]")]
public class Individuals : ControllerBase
{
  private readonly ILogger<Individuals> logger;
  private readonly IIndividualService service;
  private readonly IMapper mapper;

  public Individuals(ILogger<Individuals> logger, IIndividualService service, IMapper mapper)
  {
    this.logger = logger;
    this.service = service;
    this.mapper = mapper;
  }

  [HttpGet]
  public ActionResult<List<IndividualIdentifiersDto>> GetAll()
  {
    var individuals = service.GetAll();
    return (individuals == null) ? NotFound() : Ok(individuals);
  }

  [HttpGet("{id}")]
  public ActionResult<IndividualDto> Get(int id)
  {
    var individual = service.Get(id);
    return (individual == null) ? NotFound() : Ok(individual);
  }

  [HttpPost]
  public IActionResult Add(MutateIndividualDto individual)
  {
    logger.LogInformation("Individual first_name: {individual.FirstName}", individual.FirstName);
    var result = service.Add(individual);
    service.SaveAll();
    return CreatedAtAction(nameof(Add), new { id = result.Id }, result);
  }

  [HttpPut("{id}")]
  public IActionResult Update(int id, MutateIndividualDto individual)
  {
    if (service.Update(id, individual) is { })
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
  public ActionResult<IndividualDto> Delete(int id)
  {
    var individual = service.Delete(id);
    return (individual == true) ? NoContent() : NotFound();
  }
}

