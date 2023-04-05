using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;
using System.Text;
using CsvHelper;
using System.Globalization;

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
    var persons = await Repository.GetAllAsync(ids);
    var personsDto = Mapper.Map<IEnumerable<PersonCollectionDto>>(persons);
    return Ok(personsDto);
  }

  // GET: /persons/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var person = await Repository.GetWithDetailsAsync(id);
    if (person is null) return NotFound();
    var personDto = Mapper.Map<PersonDto>(person);
    return Ok(personDto);
  }

  // POST: /persons
  [HttpPost]
  public async Task<IActionResult> Create(CreatePersonDto personDto)
  {
    var person = Mapper.Map<Person>(personDto);
    await Repository.AddAsync(person);
    return CreatedAtAction(nameof(Get), new { id = person.Id }, Mapper.Map<PersonDto>(person));
  }

  // POST: /persons/import
  [HttpPost("import")]
  public async Task<IActionResult> Import([FromForm] IFormFile file)
  {
    var persons = new List<Person>();
    using (var csv = new CsvReader(new StreamReader(file.OpenReadStream()), CultureInfo.InvariantCulture))
    {
      var records = csv.GetRecords<PersonCSVRow>();
      foreach (var record in records)
      {
        var person = new Person {
          FirstName = record.GivenName,
          LastName = record.Surname,
          ExternalId = record.Number.ToString(),
        };
        var existingPerson = await Repository.GetByExternalIdAsync(person.ExternalId);
        if (existingPerson is not null) {
          person.Id = existingPerson.Id;
          await Repository.UpdateAsync(person);
        } else {
          await Repository.AddAsync(person);
        }
        persons.Add(person);
      }
    }
    return CreatedAtAction(nameof(GetAll), Mapper.Map<IEnumerable<PersonCollectionDto>>(persons));
  }

  // PUT: /persons/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdatePersonDto personDto)
  {
    var person = Mapper.Map<Person>(personDto);
    person.Id = id;
    var updated = await Repository.UpdateAsync(person);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /persons/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

public class PersonCSVRow
{
  public int Number { get; set; }
  public string Gender { get; set; }
  public string GivenName { get; set; }
  public string Surname { get; set; }
  public string StreetAddress { get; set; }
  public string City { get; set; }
  public string State { get; set; }
  public int ZipCode { get; set; }
  public string CountryFull { get; set; }
  public string EmailAddress { get; set; }
  public string Username { get; set; }
  public string TelephoneNumber { get; set; }
  public string Birthday { get; set; }
}
