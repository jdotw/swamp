using Microsoft.AspNetCore.Mvc;
using People.Entities;
using People.DTOs;
using AutoMapper;

namespace People.Controllers;

[ApiController]
[Route("/individuals")]
public class Individuals : ControllerBase
{
  private readonly ILogger<Individuals> _logger;
  private readonly IIndividualRepository _repository;
  private readonly IMapper _mapper;

  public Individuals(ILogger<Individuals> logger, IIndividualRepository repository, IMapper mapper)
  {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
  }

  // GET: /individuals
  [HttpGet()]
  public async Task<IActionResult> GetIndividuals([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var individuals = await _repository.GetAllIndividualsAsync(ids);
    var individualsDto = _mapper.Map<IEnumerable<IndividualDto>>(individuals);
    return Ok(individualsDto);
  }

  // GET: /individuals/5
  [HttpGet("{id}")]
  public async Task<IActionResult> GetIndividual(int id)
  {
    var individual = await _repository.GetIndividualWithDetailsAsync(id);
    if (individual is null) return NotFound();
    var individualDto = _mapper.Map<IndividualDto>(individual);
    return Ok(individualDto);
  }

  // POST: /individuals
  [HttpPost]
  public async Task<IActionResult> AddIndividual(MutateIndividualDto individualDto)
  {
    var individual = _mapper.Map<Individual>(individualDto);
    await _repository.AddIndividualAsync(individual);
    return CreatedAtAction(nameof(AddIndividual), new { id = individual.Id }, _mapper.Map<IndividualDto>(individual));
  }

  // PUT: /individuals/5
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateIndividual(int id, MutateIndividualDto individualDto)
  {
    var individual = _mapper.Map<Individual>(individualDto);
    individual.Id = id;
    var updated = await _repository.UpdateIndividualAsync(individual);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /individuals/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteIndividual(int id)
  {
    var deleted = await _repository.DeleteIndividualAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

