using Delivery.DTOs;
using Delivery.Entities;
using AutoMapper;

namespace Delivery.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Squad, SquadDto>().ReverseMap();
    CreateMap<AddSquadDto, Squad>();
    CreateMap<UpdateSquadDto, Squad>();

    CreateMap<SquadRoleType, SquadRoleTypeDto>().ReverseMap();
    CreateMap<MutateSquadRoleTypeDto, SquadRoleType>();

    CreateMap<SquadRole, SquadRoleDto>().ReverseMap();
    CreateMap<AddSquadRoleDto, SquadRole>();
    CreateMap<UpdateSquadRoleDto, SquadRole>();

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