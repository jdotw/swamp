using System.Net;
using System.Text.Json;
using Delivery.DTOs;
using Delivery.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using FluentAssertions;
using Delivery.Repository;

namespace Delivery.IntegrationTests;

public class BasicTests
    : IClassFixture<CustomWebApplicationFactory<Program, TribesSeedDataClass>>
{
  private readonly CustomWebApplicationFactory<Program, TribesSeedDataClass> _factory;
  private readonly JsonSerializerOptions _options;
  private readonly HttpClient _client;

  private readonly string _path = "/tribes";

  public BasicTests(CustomWebApplicationFactory<Program, TribesSeedDataClass> factory)
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

  private async Task<TribeDto?> CreateTribe(string name = "Test Tribe")
  {
    var tribe = await _client.PostAsJsonAsync(_path, new AddTribeDto { Name = name }, _options)
      .ContinueWith<TribeDto?>(t => t.Result.Content.ReadFromJsonAsync<TribeDto>(_options).Result);
    return tribe;
  }

  [Fact]
  public async Task TestCreateTribe()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var name = "Test Tribe Creation";
    // Act
    var tribe = await CreateTribe(name);

    // Assert
    Assert.NotNull(tribe);
    Assert.Equal(name, tribe.Name);
    tribe.FormedDate.Should().BeAfter(testStart);
    Assert.Null(tribe.DisbandedDate);
  }

  [Fact]
  public async Task TestGetAllTribes()
  {
    // Arrange
    var name = "Seen In Get All";
    var tribe = await CreateTribe(name);

    // Act
    var tribes = await _client.GetFromJsonAsync<List<Tribe>>($"{_path}", _options);

    // Assert
    Assert.NotNull(tribes);
    Assert.Contains(tribes, t => t.Name == name);
  }

  [Fact]
  public async Task TestGetTribe()
  {
    // Arrange
    var name = "Single Get Tribe";
    var createdTribe = await CreateTribe(name);
    Assert.NotNull(createdTribe);

    // Act
    var tribe = await _client.GetFromJsonAsync<TribeDto>($"{_path}/{createdTribe.Id}", _options);

    // Assert
    Assert.NotNull(tribe);
    tribe.Name.Should().Be(name);
  }

  [Fact]
  public async Task TestUpdateTribe()
  {
    // Arrange
    var tribe = CreateTribe();
    Assert.NotNull(tribe);

    // Act
    var updateDto = new UpdateTribeDto
    {
      Name = "Updated Tribe",
      DisbandedDate = DateTime.UtcNow
    };
    var response = await _client.PutAsJsonAsync($"{_path}/{tribe.Id}", updateDto, _options);
    var updatedTribe = await _client.GetFromJsonAsync<Tribe>($"{_path}/{tribe.Id}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.NotNull(updatedTribe);
    Assert.Equal(updateDto.Name, updatedTribe.Name);
    Assert.Equal(updateDto.DisbandedDate, updatedTribe.DisbandedDate);
  }

  [Fact]
  public async Task TestDeleteTribe()
  {
    // Arrange
    var name = "To Be Deleted";
    var tribe = await CreateTribe(name);
    Assert.NotNull(tribe);

    // Act
    var response = await _client.DeleteAsync($"{_path}/{tribe.Id}");
    var tribes = await _client.GetFromJsonAsync<List<Tribe>>($"{_path}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(() => _client.GetFromJsonAsync<Tribe>($"{_path}/{tribe.Id}", _options));
    Assert.Contains("404 (Not Found)", ex.Message);
    Assert.NotNull(tribes);
    Assert.DoesNotContain(tribes, t => t.Name == name);
  }
}

public class TribesSeedDataClass : ISeedDataClass
{
  private readonly DeliveryDbContext _db;

  public TribesSeedDataClass(DeliveryDbContext db)
  {
    _db = db;
  }

  public void InitializeDbForTests()
  {
    // Performs DB initialization before the 
    // start of all tests in the TribeTests class.
    // The DB is not re-initialized between tests.
  }
}