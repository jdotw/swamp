using People.Entities;
using People.Interfaces;
using People.PostgreSQL;
using People.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace People.Services;

public class IndividualService : IIndividualService
{
  private readonly ILogger<IndividualService> logger;
  private readonly PeopleContext context;
  private readonly IMapper mapper;

  public IndividualService(PeopleContext context, ILogger<IndividualService> logger, IMapper mapper)
  {
    this.logger = logger;
    this.context = context;
    this.mapper = mapper;
  }

  public List<IndividualIdentifiersDto> GetAll()
  {
    return context.Individuals.Select(c => new Individual
    {
      Id = c.Id,
      ExternalId = c.ExternalId,
    }).ProjectTo<IndividualIdentifiersDto>(mapper.ConfigurationProvider).ToList();
  }

  public IndividualDto? Get(int id)
  {
    return mapper.Map<IndividualDto>(context.Individuals.Include(p => p.Identities.OrderByDescending(c => c.Id)).FirstOrDefault(p => p.Id == id));
  }


  public IndividualDto Add(MutateIndividualDto individual)
  {
    var mappedIndividual = mapper.Map<Individual>(individual);
    var result = context.Individuals.Add(mappedIndividual);
    context.SaveChanges();
    return mapper.Map<IndividualDto>(result.Entity);
  }

  public bool Delete(int id)
  {
    var existingIndividual = context.Individuals.AsNoTracking().FirstOrDefault(p => p.Id == id);
    if (existingIndividual is not null)
    {
      context.Individuals.Remove(existingIndividual);
      context.SaveChanges();
      return true;
    }
    else
    {
      return false;
    }
  }

  public IndividualDto? Update(int id, MutateIndividualDto individual)
  {
    if (context.Individuals.AsNoTracking().FirstOrDefault(c => c.Id == id) is { })
    {
      var mappedIndividual = mapper.Map<Individual>(individual);
      mappedIndividual.Id = id;
      var individualResult = context.Individuals.Update(mappedIndividual);
      var identityResult = context.Identities.Add(mappedIndividual.Identities[0]);
      context.SaveChanges();
      return mapper.Map<IndividualDto>(mappedIndividual);
    }
    else
    {
      return null;
    }
  }

  public bool SaveAll() => context.SaveChanges() > 0;
}