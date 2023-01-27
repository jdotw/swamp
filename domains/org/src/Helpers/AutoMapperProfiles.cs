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
    CreateMap<CreateFunctionTypeDto, FunctionType>();
    CreateMap<UpdateFunctionTypeDto, FunctionType>();

    CreateMap<Level, LevelDto>();
    CreateMap<CreateLevelDto, Level>();
    CreateMap<UpdateLevelDto, Level>();

    CreateMap<LevelAssignment, LevelAssignmentDto>();
    CreateMap<CreateLevelAssignmentDto, LevelAssignment>();
    CreateMap<UpdateLevelAssignmentDto, LevelAssignment>();

    CreateMap<Person, PersonDto>();
    CreateMap<CreatePersonDto, Person>();
    CreateMap<UpdatePersonDto, Person>();

    CreateMap<Practice, PracticeDto>();
    CreateMap<CreatePracticeDto, Practice>();
    CreateMap<UpdatePracticeDto, Practice>();

    CreateMap<Role, RoleDto>();
    CreateMap<CreateRoleDto, Role>();
    CreateMap<UpdateRoleDto, Role>();

    CreateMap<RoleAssignment, RoleAssignmentDto>();
    CreateMap<CreateRoleAssignmentDto, RoleAssignment>();
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
    CreateMap<CreateUnitDto, Unit>()
    .IncludeAllDerived();
    CreateMap<UpdateUnitDto, Unit>()
    .IncludeAllDerived();

    CreateMap<UnitAssignment, UnitAssignmentDto>();
    CreateMap<CreateUnitAssignmentDto, UnitAssignment>();
    CreateMap<UpdateUnitAssignmentDto, UnitAssignment>();
  }
}