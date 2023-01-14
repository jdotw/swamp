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

    CreateMap<RoleType, RoleTypeDto>();
    CreateMap<CreateRoleTypeDto, RoleType>();
    CreateMap<UpdateRoleTypeDto, RoleType>();

    CreateMap<Role, RoleDto>();
    CreateMap<CreateRoleDto, Role>();
    CreateMap<UpdateRoleDto, Role>();

    CreateMap<FunctionType, FunctionTypeDto>();
    CreateMap<CreateFunctionTypeDto, FunctionType>();
    CreateMap<UpdateFunctionTypeDto, FunctionType>();

  }
}