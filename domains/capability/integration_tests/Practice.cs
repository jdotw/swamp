using System.Net;
using System.Text.Json;
using Capability.DTOs;
using Capability.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using FluentAssertions;

namespace Capability.IntegrationTests;

public class BasicTests
    : IClassFixture<CustomWebApplicationFactory<Program>>
{
  private readonly CustomWebApplicationFactory<Program> _factory;
  private readonly JsonSerializerOptions _options;
  private readonly HttpClient _client;

  private readonly string _path = "/practices";

  public BasicTests(CustomWebApplicationFactory<Program> factory)
  {
    _factory = factory;
    _options = new JsonSerializerOptions()
    {
      PropertyNamingPolicy =
             new JsonSnakeCaseNamingPolicy()
    };
    _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
    {
      AllowAutoRedirect = false,
    });
  }

  private async Task<PracticeDto?> CreatePractice(string name = "Test Practice")
  {
    var practice = await _client.PostAsJsonAsync(_path, new AddPracticeDto { Name = name }, _options)
      .ContinueWith<PracticeDto?>(t => t.Result.Content.ReadFromJsonAsync<PracticeDto>(_options).Result);
    return practice;
  }

  [Fact]
  public async Task TestCreatePractice()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var name = "Test Practice Creation";
    // Act
    var practice = await CreatePractice(name);

    // Assert
    Assert.NotNull(practice);
    Assert.Equal(name, practice.Name);
    practice.FormedDate.Should().BeAfter(testStart);
    Assert.Null(practice.DisbandedDate);
  }

  [Fact]
  public async Task TestGetAllPractices()
  {
    // Arrange
    var name = "Seen In Get All";
    var practice = await CreatePractice(name);

    // Act
    var practices = await _client.GetFromJsonAsync<List<Practice>>($"{_path}", _options);

    // Assert
    Assert.NotNull(practices);
    Assert.Contains(practices, t => t.Name == name);
  }

  [Fact]
  public async Task TestGetPractice()
  {
    // Arrange
    var name = "Single Get Practice";
    var createdPractice = await CreatePractice(name);
    Assert.NotNull(createdPractice);

    // Act
    var practice = await _client.GetFromJsonAsync<PracticeDto>($"{_path}/{createdPractice.Id}", _options);

    // Assert
    Assert.NotNull(practice);
    practice.Name.Should().Be(name);
  }

  [Fact]
  public async Task TestUpdatePractice()
  {
    // Arrange
    var practice = CreatePractice();
    Assert.NotNull(practice);

    // Act
    var updateDto = new UpdatePracticeDto
    {
      Name = "Updated Practice",
      DisbandedDate = DateTime.UtcNow
    };
    var response = await _client.PutAsJsonAsync($"{_path}/{practice.Id}", updateDto, _options);
    var updatedPractice = await _client.GetFromJsonAsync<Practice>($"{_path}/{practice.Id}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.NotNull(updatedPractice);
    Assert.Equal(updateDto.Name, updatedPractice.Name);
    Assert.Equal(updateDto.DisbandedDate, updatedPractice.DisbandedDate);
  }

  [Fact]
  public async Task TestDeletePractice()
  {
    // Arrange
    var name = "To Be Deleted";
    var practice = await CreatePractice(name);
    Assert.NotNull(practice);

    // Act
    var response = await _client.DeleteAsync($"{_path}/{practice.Id}");
    var practices = await _client.GetFromJsonAsync<List<Practice>>($"{_path}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(() => _client.GetFromJsonAsync<Practice>($"{_path}/{practice.Id}", _options));
    Assert.Contains("404 (Not Found)", ex.Message);
    Assert.NotNull(practices);
    Assert.DoesNotContain(practices, t => t.Name == name);
  }
}