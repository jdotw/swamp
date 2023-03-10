using Org.DTOs;
using Org.Entities;
using AutoMapper;

namespace Org.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Chapter, ChapterDto>();
    CreateMap<CreateChapterDto, Chapter>();
    CreateMap<UpdateChapterDto, Chapter>();

    CreateMap<FunctionType, FunctionTypeDto>();
    CreateMap<FunctionType, FunctionTypeCollectionDto>();
    CreateMap<CreateFunctionTypeDto, FunctionType>();
    CreateMap<UpdateFunctionTypeDto, FunctionType>();

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

    CreateMap<Practice, PracticeDto>();
    CreateMap<CreatePracticeDto, Practice>();
    CreateMap<UpdatePracticeDto, Practice>();

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
          .FirstOrDefault()))
      .ForMember(dest => dest.DeliveryUnitAssignment,
        opt => opt.MapFrom(src => src.UnitAssignments
          .Where(u => u.EndDate == null
            && (u.Unit is Squad)
            || u.Unit is Tribe
            || u.Unit is Team)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()))
      .ForMember(dest => dest.CapabilityUnitAssignment,
        opt => opt.MapFrom(src => src.UnitAssignments
          .Where(u => u.EndDate == null
            && (u.Unit is Practice
            || u.Unit is Chapter))
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
          .FirstOrDefault()))
      .ForMember(dest => dest.DeliveryUnitAssignment,
        opt => opt.MapFrom(src => src.UnitAssignments
          .Where(u => u.EndDate == null
            && (u.Unit is Squad)
            || u.Unit is Tribe
            || u.Unit is Team)
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()))
      .ForMember(dest => dest.CapabilityUnitAssignment,
        opt => opt.MapFrom(src => src.UnitAssignments
          .Where(u => u.EndDate == null
            && (u.Unit is Practice
            || u.Unit is Chapter))
          .OrderBy(u => u.StartDate)
          .FirstOrDefault()));
    CreateMap<CreateRoleDto, Role>();
    CreateMap<CreateUnitRoleDto, Role>();
    CreateMap<UpdateRoleDto, Role>();

    CreateMap<RoleAssignment, RoleAssignmentDto>();
    CreateMap<CreateRoleAssignmentWithPersonIdDto, RoleAssignment>();
    CreateMap<CreateRoleAssignmentWithRoleIdDto, RoleAssignment>();
    CreateMap<UpdateRoleAssignmentDto, RoleAssignment>();

    CreateMap<RoleType, RoleTypeDto>();
    CreateMap<CreateRoleTypeDto, RoleType>();
    CreateMap<UpdateRoleTypeDto, RoleType>();

    CreateMap<Squad, SquadDto>();
    CreateMap<CreateSquadDto, Squad>();
    CreateMap<UpdateSquadDto, Squad>();

    CreateMap<Team, TeamDto>();
    CreateMap<CreateTeamDto, Team>();
    CreateMap<UpdateTeamDto, Team>();

    CreateMap<Tribe, TribeDto>();
    CreateMap<CreateTribeDto, Tribe>();
    CreateMap<UpdateTribeDto, Tribe>();

    CreateMap<Unit, UnitDto>()
    .IncludeAllDerived();
    CreateMap<Unit, UnitCollectionDto>()
    .IncludeAllDerived();
    CreateMap<CreateUnitDto, Unit>()
    .IncludeAllDerived();
    CreateMap<UpdateUnitDto, Unit>()
    .IncludeAllDerived();

    CreateMap<UnitAssignment, UnitAssignmentDto>();
    CreateMap<UnitAssignment, UnitAssignmentCollectionDto>();
    CreateMap<CreateUnitAssignmentDto, UnitAssignment>();
    CreateMap<UpdateUnitAssignmentDto, UnitAssignment>();
  }
}
