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

public class PracticeTests
    : TestsBase<PracticesSeedDataClass, OrgDbContext, Program>, IClassFixture<OrgWebApplicationFactory<Program>>
{
  private readonly string _path = "/practices";

  public PracticeTests(OrgWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreatePractice()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var newPractice = new CreatePracticeDto
    {
      Name = "Test Practice",
    };

    // Act
    var practice = await _client.PostAsJsonAsync(_path, newPractice, _options)
      .ContinueWith<PracticeDto?>(t => t.Result.Content.ReadFromJsonAsync<PracticeDto>(_options).Result);

    // Assert
    Assert.NotEqual(0, practice!.Id);
    Assert.Equal(newPractice.Name, practice.Name);
  }

  [Fact]
  public async Task TestGetAllPractices()
  {
    // Arrange
    var existingPractice = _seedData.Practice;

    // Act
    var practices = await _client.GetFromJsonAsync<List<Practice>>($"{_path}", _options);

    // Assert
    Assert.Contains(practices!, t => t.Id == existingPractice.Id);
  }

  [Fact]
  public async Task TestGetPractice()
  {
    // Arrange
    var existingPractice = _seedData.Practice;

    // Act
    var practice = await _client.GetFromJsonAsync<PracticeDto>($"{_path}/{existingPractice.Id}", _options);

    // Assert
    Assert.Equal(practice!.Id, existingPractice.Id);
    Assert.Equal(practice.Name, existingPractice.Name);
  }

  [Fact]
  public async Task TestUpdatePractice_OnSuccess_ReturnsNoContent()
  {
    // Arrange
    var existingPractice = _seedData.Practice;
    var updateDto = new UpdatePracticeDto
    {
      Name = "new Name",
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/{existingPractice.Id}", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }

  [Fact]
  public async Task TestUpdatePractice_ForNonExistentPractice_ReturnsNotFound()
  {
    // Arrange
    var existingPractice = _seedData.Practice;
    var updateDto = new UpdatePracticeDto
    {
      Name = existingPractice.Name,
    };

    // Act
    var response = await _client.PutAsJsonAsync($"{_path}/4352345", updateDto, _options);

    // Assert
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task TestDeletePractice()
  {
    // Arrange
    var practice = _seedData.Practice;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{practice.Id}");

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
  }
}

public class PracticesSeedDataClass : ISeedDataClass<OrgDbContext>
{
  public Practice Practice = null!;

  public void InitializeDbForTests(OrgDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the PracticeTests class.
    // The DB is not re-initialized between tests.
    Practice = db.Practices.Add(new Practice
    {
      Name = "Practice Name",
    }).Entity;

    db.SaveChanges(true);
  }
}