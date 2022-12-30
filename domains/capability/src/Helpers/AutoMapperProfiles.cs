using Capability.DTOs;
using Capability.Entities;
using AutoMapper;

namespace Capability.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Chapter, ChapterDto>().ReverseMap();

    CreateMap<ChapterRoleType, ChapterRoleTypeDto>().ReverseMap();
    CreateMap<MutateChapterRoleTypeDto, ChapterRoleType>();

    CreateMap<ChapterRole, ChapterRoleDto>().ReverseMap();
    CreateMap<AddChapterRoleDto, ChapterRole>();
    CreateMap<UpdateChapterRoleDto, ChapterRole>();

    CreateMap<Practice, PracticeDto>().ReverseMap();
    CreateMap<AddPracticeDto, Practice>();
    CreateMap<UpdatePracticeDto, Practice>();

    CreateMap<PracticeRoleType, PracticeRoleTypeDto>().ReverseMap();
    CreateMap<MutatePracticeRoleTypeDto, PracticeRoleType>();

    CreateMap<PracticeRole, PracticeRoleDto>().ReverseMap();
    CreateMap<AddPracticeRoleDto, PracticeRole>();
    CreateMap<UpdatePracticeRoleDto, PracticeRole>();
  }
}