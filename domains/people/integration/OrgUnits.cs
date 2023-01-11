using System.Net;
using System.Text.Json;
using People.DTOs;
using People.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using FluentAssertions;
using People.Repository;
using Base.IntegrationTests;

namespace People.IntegrationTests;

public class OrgUnitTests
    : TestsBase<OrgUnitsSeedDataClass, PeopleDbContext, Program>, IClassFixture<PeopleWebApplicationFactory<Program>>
{
  private readonly string _path = "/orgunits";

  public OrgUnitTests(PeopleWebApplicationFactory<Program> factory) : base(factory)
  {
  }

  [Fact]
  public async Task TestCreateOrgUnit()
  {
    // Arrange
    var testStart = DateTime.UtcNow;
    var name = "Test OrgUnit Creation";

    // Act
    var orgUnit = await _client.PostAsJsonAsync(_path, new MutateOrgUnitDto { Name = name }, _options)
      .ContinueWith<OrgUnitDto?>(t => t.Result.Content.ReadFromJsonAsync<OrgUnitDto>(_options).Result);

    // Assert
    Assert.NotNull(orgUnit);
    Assert.Equal(name, orgUnit.Name);
    orgUnit.FormedDate.Should().BeOnOrAfter(testStart);
    Assert.Null(orgUnit.DisbandedDate);
  }

  [Fact]
  public async Task TestGetAllOrgUnits()
  {
    // Arrange
    // (Note: existing records added by DbSeedClass)

    // Act
    var orgUnits = await _client.GetFromJsonAsync<List<OrgUnit>>($"{_path}", _options);

    // Assert
    Assert.NotNull(orgUnits);
    Assert.Contains(orgUnits, t => t.Name == _seedData.OrgUnit.Name);
  }

  [Fact]
  public async Task TestGetOrgUnit()
  {
    // Arrange

    // Act
    var orgUnit = await _client.GetFromJsonAsync<OrgUnitDto>($"{_path}/{_seedData.OrgUnit.Id}", _options);

    // Assert
    Assert.NotNull(orgUnit);
    Assert.Equal(orgUnit.Name, _seedData.OrgUnit.Name);
  }

  [Fact]
  public async Task TestUpdateOrgUnit()
  {
    // Arrange
    var orgUnit = _seedData.OrgUnit;

    // Act
    var updateDto = new MutateOrgUnitDto
    {
      Name = "Updated OrgUnit",
      DisbandedDate = DateTime.UtcNow
    };
    var response = await _client.PutAsJsonAsync($"{_path}/{orgUnit.Id}", updateDto, _options);
    var updatedOrgUnit = await _client.GetFromJsonAsync<OrgUnit>($"{_path}/{orgUnit.Id}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    Assert.NotNull(updatedOrgUnit);
    Assert.Equal(updateDto.Name, updatedOrgUnit.Name);
    Assert.Equal(updateDto.DisbandedDate, updatedOrgUnit.DisbandedDate);
  }

  [Fact]
  public async Task TestDeleteOrgUnit()
  {
    // Arrange
    var orgUnit = _seedData.OrgUnit;

    // Act
    var response = await _client.DeleteAsync($"{_path}/{orgUnit.Id}");
    var orgUnits = await _client.GetFromJsonAsync<List<OrgUnit>>($"{_path}", _options);

    // Assert
    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    var ex = await Assert.ThrowsAsync<System.Net.Http.HttpRequestException>(() => _client.GetFromJsonAsync<OrgUnit>($"{_path}/{orgUnit.Id}", _options));
    Assert.Contains("404 (Not Found)", ex.Message);
    Assert.NotNull(orgUnits);
    Assert.DoesNotContain(orgUnits, t => t.Id == orgUnit.Id);
  }
}

public class OrgUnitsSeedDataClass : ISeedDataClass<PeopleDbContext>
{
  public OrgUnit OrgUnit = null!;

  public void InitializeDbForTests(PeopleDbContext db)
  {
    // Performs DB initialization before the 
    // start of all tests in the OrgUnitTests class.
    // The DB is not re-initialized between tests.
    OrgUnit = db.OrgUnits.Add(new OrgUnit
    {
      Name = "Seed OrgUnit",
      FormedDate = DateTime.UtcNow,
      DisbandedDate = null
    }).Entity;

    db.SaveChanges(true);
  }
}