using People.Entities;
using People.Interfaces;
using People.PostgreSQL;
using People.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace People.Services;

public class LineManagerService : ILineManagerService
{
  private readonly ILogger<LineManagerService> logger;
  private readonly PeopleContext context;
  private readonly IMapper mapper;

  public LineManagerService(PeopleContext context, ILogger<LineManagerService> logger, IMapper mapper)
  {
    this.logger = logger;
    this.context = context;
    this.mapper = mapper;
  }

  public List<LineManagerDto> GetAll(int individualId)
  {
    return context.LineManagers
    .Where(p => p.IndividualId == individualId)
    .ProjectTo<LineManagerDto>(mapper.ConfigurationProvider).ToList();
  }

  public LineManagerDto? Get(int id)
  {
    return mapper.Map<LineManagerDto>(context.LineManagers.FirstOrDefault(p => p.Id == id));
  }

  public LineManagerDto Add(int individualId, AddLineManagerDto lineManager)
  {
    var mappedLineManager = mapper.Map<LineManager>(lineManager);
    mappedLineManager.IndividualId = individualId;
    var result = context.LineManagers.Add(mappedLineManager);
    context.SaveChanges();
    return mapper.Map<LineManagerDto>(result.Entity);
  }

  public LineManagerDto? Update(int id, MutateLineManagerDto lineManager)
  {
    var existing = context.LineManagers.AsNoTracking().FirstOrDefault(c => c.Id == id);
    if (existing is not null)
    {
      var mappedLineManager = mapper.Map<LineManager>(lineManager);
      mappedLineManager.Id = existing.Id;
      mappedLineManager.IndividualId = existing.IndividualId;
      mappedLineManager.ManagerId = existing.ManagerId;
      var result = context.LineManagers.Update(mappedLineManager);
      context.SaveChanges();
      return mapper.Map<LineManagerDto>(mappedLineManager);
    }
    else
    {
      return null;
    }
  }

  public bool Delete(int id)
  {
    var existing = context.LineManagers.AsNoTracking().FirstOrDefault(p => p.Id == id);
    if (existing is not null)
    {
      context.LineManagers.Remove(existing);
      context.SaveChanges();
      return true;
    }
    else
    {
      return false;
    }
  }


  public bool SaveAll() => context.SaveChanges() > 0;
}