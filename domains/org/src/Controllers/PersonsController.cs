using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/persons")]
public class PersonsController : ControllerBase<Person, IPersonRepository>
{
  public PersonsController(ILogger<PersonsController> logger, IPersonRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /persons
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var persons = await Repository.GetAllPersonsAsync(ids);
    var personsDto = Mapper.Map<IEnumerable<PersonDto>>(persons);
    return Ok(personsDto);
  }

  // GET: /persons/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var person = await Repository.GetPersonWithDetailsAsync(id);
    if (person is null) return NotFound();
    var personDto = Mapper.Map<PersonDto>(person);
    return Ok(personDto);
  }

  // POST: /persons
  [HttpPost]
  public async Task<IActionResult> Create(CreatePersonDto personDto)
  {
    var person = Mapper.Map<Person>(personDto);
    await Repository.AddPersonAsync(person);
    return CreatedAtAction(nameof(Get), new { id = person.Id }, Mapper.Map<PersonDto>(person));
  }

  // PUT: /persons/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdatePersonDto personDto)
  {
    var person = Mapper.Map<Person>(personDto);
    person.Id = id;
    var updated = await Repository.UpdatePersonAsync(person);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /persons/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeletePersonAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

