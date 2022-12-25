using Delivery.DTOs;
using Delivery.Entities;
using AutoMapper;

namespace Delivery.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Squad, SquadDto>();
    CreateMap<SquadDto, Squad>();
  }
}