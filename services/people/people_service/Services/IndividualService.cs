using Entity.Models;
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

  public List<Individual> GetAll()
  {
    // var individuals = context.Individuals.Include(c => c.Identities.OrderBy(i => i.Id).Take(1));
    return context.Individuals.Select(c => new Individual
    {
      Id = c.Id,
      ExternalId = c.ExternalId,
      // Identities = c.Identities.Select(i => new IdentityDto
      // {
      // Id = i.Id,
      // Name = i.Name,
      // Type = i.Type,
      // IndividualId = i.IndividualId
      // }).OrderBy(i => i.Id).Take(1).ToList()
    }).ToList();
    // return individuals.ProjectTo<IndividualDto>(mapper.ConfigurationProvider).ToList();
  }

  public Individual? Get(int id) => context.Individuals.FirstOrDefault(p => p.Id == id);

  public Individual Add(Individual individual)
  {
    var result = context.Individuals.Add(individual);
    context.SaveChanges();
    return result.Entity;
  }

  public Individual? Delete(int id)
  {
    // Delete the Individual 
    var existingIndividual = context.Individuals.FirstOrDefault(p => p.Id == id);
    if (existingIndividual is not null)
    {
      context.Individuals.Remove(existingIndividual);
      context.SaveChanges();
      return existingIndividual;
    }
    else
    {
      return null;
    }
  }

  public Individual? Update(Individual individual)
  {
    if (context.Individuals.FirstOrDefault(c => c.Id == individual.Id) is { })
    {
      var result = context.Individuals.Update(individual);
      context.SaveChanges();
      return result.Entity;
    }
    else
    {
      return null;
    }
  }

  public bool SaveAll() => context.SaveChanges() > 0;
}