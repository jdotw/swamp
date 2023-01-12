using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Base.Controllers;

public class ControllerBase<TEntity, TRepository> : Microsoft.AspNetCore.Mvc.ControllerBase
  where TEntity : class
  where TRepository : class
{
  protected readonly ILogger<ControllerBase> _logger;
  protected readonly TRepository _repository;
  protected readonly IMapper _mapper;

  public ControllerBase(ILogger<ControllerBase> logger,
    TRepository repository,
    IMapper mapper)
  {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
  }

}

