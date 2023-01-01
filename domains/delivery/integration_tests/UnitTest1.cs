using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace integration_tests;

public class BasicTests
    : IClassFixture<WebApplicationFactory<Program>>
{
  private readonly WebApplicationFactory<Program> _factory;

  public BasicTests(WebApplicationFactory<Program> factory)
  {
    _factory = factory;
  }

  [Theory]
  [InlineData("/tribes")]
  public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
  {
    // Arrange
    var client = _factory.CreateClient();

    // Act
    var response = await client.GetAsync(url);

    // Assert
    response.EnsureSuccessStatusCode(); // Status Code 200-299
    Assert.Equal("application/json; charset=utf-8",
        response.Content.Headers.ContentType.ToString());
  }
}