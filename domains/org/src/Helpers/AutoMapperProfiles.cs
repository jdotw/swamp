using Org.DTOs;
using Org.Entities;
using AutoMapper;

namespace Org.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Level, LevelDto>();
    CreateMap<Level, LevelCollectionDto>();
    CreateMap<CreateLevelDto, Level>();
    CreateMap<UpdateLevelDto, Level>();

    CreateMap<LevelAssignment, LevelAssignmentDto>();
    CreateMap<LevelAssignment, LevelAssignmentCollectionDto>();
    CreateMap<CreateLevelAssignmentDto, LevelAssignment>();
    CreateMap<UpdateLevelAssignmentDto, LevelAssignment>();

    CreateMap<Person, PersonDto>();
    CreateMap<Person, PersonCollectionDto>().ForMember(dest => dest.ActiveRoleAssignments,
      opt => opt.MapFrom(src => src.RoleAssignments
        .Where(r => r.EndDate == null)
        .OrderBy(u => u.StartDate)
        .ToList()));
    CreateMap<CreatePersonDto, Person>();
    CreateMap<UpdatePersonDto, Person>();

    CreateMap<Role, RoleCollectionDto>()
      .ForMember(dest => dest.ActiveLevelAssignment,
        opt => opt.MapFrom(src => src.LevelAssignments
          .Where(r => r.EndDate == null)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()))
      .ForMember(dest => dest.ActiveRoleAssignment,
        opt => opt.MapFrom(src => src.RoleAssignments
          .Where(r => r.EndDate == null)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()));

    CreateMap<RoleType, RoleCollectionRoleTypeDto>();
    CreateMap<LevelAssignment, RoleCollectionActiveLevelAssignmentDto>();
    CreateMap<Level, RoleCollectionLevelDto>();
    CreateMap<RoleAssignment, RoleCollectionActiveRoleAssignmentDto>();
    CreateMap<RoleAssignment, RoleAssignmentCollectionDto>();
    CreateMap<Person, RoleCollectionPersonDto>();
    CreateMap<RoleType, RoleTypeCollectionDto>();
    CreateMap<RoleType, RoleTypeParentDto>();

    CreateMap<Role, RoleDto>()
      .ForMember(dest => dest.ActiveRoleAssignment,
        opt => opt.MapFrom(src => src.RoleAssignments
          .Where(r => r.EndDate == null)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()))
      .ForMember(dest => dest.ActiveLevelAssignment,
        opt => opt.MapFrom(src => src.LevelAssignments
          .Where(r => r.EndDate == null)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()));
    CreateMap<CreateRoleDto, Role>();
    CreateMap<UpdateRoleDto, Role>();

    CreateMap<RoleAssignment, RoleAssignmentDto>();
    CreateMap<CreateRoleAssignmentWithPersonIdDto, RoleAssignment>();
    CreateMap<CreateRoleAssignmentWithRoleIdDto, RoleAssignment>();
    CreateMap<UpdateRoleAssignmentDto, RoleAssignment>();

    CreateMap<RoleType, RoleTypeDto>();
    CreateMap<CreateRoleTypeDto, RoleType>();
    CreateMap<UpdateRoleTypeDto, RoleType>();

    CreateMap<Team, TeamDto>();
    CreateMap<Team, TeamCollectionDto>();
    CreateMap<CreateTeamDto, Team>();
    CreateMap<UpdateTeamDto, Team>();

    CreateMap<DeploymentType, DeploymentTypeDto>();
    CreateMap<DeploymentType, DeploymentTypeCollectionDto>();
    CreateMap<CreateDeploymentTypeDto, DeploymentType>();
    CreateMap<UpdateDeploymentTypeDto, DeploymentType>();

    CreateMap<CapabilityType, CapabilityTypeDto>();
    CreateMap<CapabilityType, CapabilityTypeCollectionDto>();
    CreateMap<CreateCapabilityTypeDto, CapabilityType>();
    CreateMap<UpdateCapabilityTypeDto, CapabilityType>();
  }
}
