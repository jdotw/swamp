using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace Base.Controllers;

public class ControllerBase<TEntity, TRepository> : Microsoft.AspNetCore.Mvc.ControllerBase
  where TEntity : class
  where TRepository : class
{
  protected readonly ILogger<ControllerBase> Logger;
  protected readonly TRepository Repository;
  protected readonly IMapper Mapper;

  public ControllerBase(ILogger<ControllerBase> logger,
    TRepository repository,
    IMapper mapper)
  {
    Logger = logger;
    Repository = repository;
    Mapper = mapper;
  }

}

