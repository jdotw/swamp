using Microsoft.AspNetCore.Mvc;
using People.Models;
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
  private readonly ILogger<Individuals> _logger;
  private readonly IIndividualService _service;
  private readonly IMapper _mapper;

  public Individuals(ILogger<Individuals> logger, IIndividualService service, IMapper mapper)
  {
    _logger = logger;
    _service = service;
    _mapper = mapper;
  }

  [HttpGet]
  public ActionResult<List<Individual>> GetAll()
  {
    var categories = _service.GetAll();
    return (categories == null) ? NotFound() : Ok(categories);
  }

  [HttpGet("{id}")]
  public ActionResult<Individual> Get(int id)
  {
    var individual = _service.Get(id);
    return (individual == null) ? NotFound() : Ok(individual);
  }

  [HttpPost]
  public IActionResult Create(CreateIndividualDto individualDto)
  {
    var individual = _mapper.Map<Individual>(individualDto);
    _logger.LogInformation("Individual Identities: {0}", individual.Identities);
    var result = _service.Add(individual);
    _service.SaveAll();
    return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
  }

  [HttpPut("{id}")]
  public IActionResult Update(int id, Individual individual)
  {
    if (id != individual.Id)
      return BadRequest();



    if (_service.Update(individual) is { })
    {
      _service.SaveAll();
      return NoContent();
    }
    else
    {
      return NotFound();
    }
  }
}

