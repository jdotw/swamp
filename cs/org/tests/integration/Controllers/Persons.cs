using System.Net;
using System.Text.Json;
using Org.DTOs;
using Org.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using FluentAssertions;
using Org.Repository;
using Base.IntegrationTests;
using System.Net.Http.Json;

namespace Org.IntegrationTests;

public class PersonTests
    : TestsBase<PersonsSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/persons";

  public PersonTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreatePerson()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newPerson = new CreatePersonDto
    {
      ExternalId = "1234567890",
      FirstName = "Test",
      LastName = "Person",
    };

    // Act
    var person = await _client.PostAsJsonAsync(_path, newPerson, _options)
      .ContinueWith<PersonDto?>(t => t.Result.Content.ReadFromJsonAsync<PersonDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, person!.Id);
    Assert.Equal(newPerson.ExternalId, person.ExternalId);
    Assert.Equal(newPerson.FirstName, person.FirstName);
    Assert.Equal(newPerson.LastName, person.LastName);
    Assert.Null(person.MiddleNames);
  }

  [Fact]
  public async Task TestGetAllPersons()
  {
    // Arrange
    var existingPerson = _seedData.Person;

    // Act
    var persons = await _client.GetFromJsonAsync<List<Person>>($"{_path}", _options);

    // Assert
    Assert.Contains(persons!, t => t.Id == existingPerson.Id);
  }

  [Fact]
  public async Task TestGetPerson()
  {
    // Arrange
    var existingPerson = _seedData.Person;

    // Act
    var person = await _client.GetFromJsonAsync<PersonDto>($"{_path}/{existingPerson.Id}", _options);

    // Assert
    Assert.Equal(person!.Id, existingPerson.Id);
    Assert.Equal(person.ExternalId, existingPerson.ExternalId);
    Assert.Equal(person.FirstName, existingPerson.FirstName);
    Assert.Equal(person.MiddleNames, existingPerson.MiddleNames);
    Assert.Equal(person.LastName, existingPerson.LastName);
  }

  [Fact]
  public async Task TestUpdatePerson_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingPerson = _seedData.Person;
    var updateDto = new UpdatePersonDto
    {
      FirstName = existingPerson.FirstName,
      MiddleNames = existingPerson.MiddleNames,
      LastName = "NewLastName",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingPerson.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdatePerson_ForNonExistentPerson_ReturnsNotFound()
  {
    // Arrange
    var existingPerson = _seedData.Person;
    var updateDto = new UpdatePersonDto
    {
      FirstName = existingPerson.FirstName,
      MiddleNames = existingPerson.MiddleNames,
      LastName = "NewLastName",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeletePerson()
  {
    // Arrange
    var person = _seedData.Person;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{person.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class PersonsSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Person Person = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the PersonTests class.
    // The DB is not re-initialized between tests.
    Person = db.Persons.Add(new Person
    {
      ExternalId = "SDNK132132131",
      FirstName = "Seed",
      MiddleNames = "Lucky",
      LastName = "Person",
    }).Entity;

    db.SaveChanges(true);
  }
}