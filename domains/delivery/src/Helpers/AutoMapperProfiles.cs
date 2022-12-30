using Delivery.DTOs;
using Delivery.Entities;
using AutoMapper;

namespace Delivery.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Squad, SquadDto>().ReverseMap();

    CreateMap<SquadRoleType, SquadRoleTypeDto>().ReverseMap();
    CreateMap<MutateSquadRoleTypeDto, SquadRoleType>();

    CreateMap<Tribe, TribeDto>().ReverseMap();
    CreateMap<AddTribeDto, Tribe>();
    CreateMap<UpdateTribeDto, Tribe>();

    CreateMap<TribeRoleType, TribeRoleTypeDto>().ReverseMap();
    CreateMap<MutateTribeRoleTypeDto, TribeRoleType>();

    CreateMap<TribeRole, TribeRoleDto>().ReverseMap();
    CreateMap<AddTribeRoleDto, TribeRole>();
    CreateMap<UpdateTribeRoleDto, TribeRole>();
  }
}