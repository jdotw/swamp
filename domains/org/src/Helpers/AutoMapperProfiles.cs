using Org.DTOs;
using Org.Entities;
using AutoMapper;

namespace Org.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Person, PersonDto>();
    CreateMap<CreatePersonDto, Person>();
    CreateMap<UpdatePersonDto, Person>();
  }
}