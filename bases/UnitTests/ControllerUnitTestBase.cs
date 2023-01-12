using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace Base.UnitTests;

public abstract class ControllerUnitTestBase<TController, TRepository>
where TRepository : class
{
  protected readonly Mock<TRepository> _mockRepository;
  protected readonly Mock<IMapper> _mockMapper;
  protected readonly Mock<ILogger<TController>> _mockLogger;

  public ControllerUnitTestBase()
  {
    _mockLogger = new Mock<ILogger<TController>>();
    _mockMapper = new Mock<IMapper>();
    _mockRepository = new Mock<TRepository>();
  }
}