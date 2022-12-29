using Delivery.DTOs;
using Delivery.Entities;
using AutoMapper;

namespace Delivery.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Squad, SquadDto>().ReverseMap();

    CreateMap<Tribe, TribeDto>().ReverseMap();
    CreateMap<AddTribeDto, Tribe>();
    CreateMap<UpdateTribeDto, Tribe>();

    CreateMap<TribeRoleType, TribeRoleTypeDto>().ReverseMap();
    CreateMap<MutateTribeRoleTypeDto, TribeRoleType>();
  }
}