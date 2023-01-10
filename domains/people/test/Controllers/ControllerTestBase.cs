using JorgeSerrano.Json;
using People.DTOs;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using People.Repository;
using People.Controllers;
using People.Entities;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace people_service_tests;

public abstract class ControllerTestBase<TController, TRepository>
where TController : class
where TRepository : class
{
  private readonly Mock<TRepository> _mockRepository;
  private readonly Mock<IMapper> _mockMapper;
  private readonly Mock<ILogger<TController>> _mockLogger;

  private readonly TController _controller;

  public ControllerTestBase()
  {
    _mockLogger = new Mock<ILogger<TController>>();
    _mockMapper = new Mock<IMapper>();
    _mockRepository = new Mock<TRepository>();
    // _controller = new TController(_mockLogger.Object, _mockRepository.Object, _mockMapper.Object);
  }

}