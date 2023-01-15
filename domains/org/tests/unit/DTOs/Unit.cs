using FluentAssertions;
using Org.DTOs;

namespace Org.UnitTests;

public class UnitDtoTests
{
  [Fact]
  public void CreateUnitDto_FormedDate_DefaultsToNow()
  {
    var testStart = DateTimeOffset.UtcNow;
    var dto = new CreateUnitDto();
    dto.FormedDate.Should().BeOnOrAfter(testStart);
  }
}