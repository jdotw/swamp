using People.DTOs;
using People.Entities;
using AutoMapper;

namespace People.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<Individual, IndividualDto>().IncludeMembers(c => c.Identities)
    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(c => c.Identities[0].FirstName))
    .ForMember(dest => dest.LastName, opt => opt.MapFrom(c => c.Identities[0].LastName))
    .ForMember(dest => dest.MiddleNames, opt => opt.MapFrom(c => c.Identities[0].MiddleNames));
    CreateMap<List<Identity>, IndividualDto>();

    CreateMap<CreateIndividualDto, Individual>().ForMember(dest => dest.Identities, opt => opt.MapFrom(c => new List<Identity> { new Identity {
      FirstName = c.FirstName,
      LastName = c.LastName,
      MiddleNames = c.MiddleNames
    } }));
    CreateMap<UpdateIndividualDto, Individual>().ForMember(dest => dest.Identities, opt => opt.MapFrom(c => new List<Identity> { new Identity {
      FirstName = c.FirstName,
      LastName = c.LastName,
      MiddleNames = c.MiddleNames
    } }));

    CreateMap<LineManager, LineManagerDto>();
    CreateMap<CreateLineManagerDto, LineManager>();
    CreateMap<UpdateLineManagerDto, LineManager>();
  }
}