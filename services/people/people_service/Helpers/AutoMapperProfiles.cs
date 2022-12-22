using People.DTOs;
using Entity.Models;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<MutateIndividualDto, Individual>().ForMember(dest => dest.Identities, opt => opt.MapFrom(c => new List<Identity> { new Identity {
      FirstName = c.FirstName,
      LastName = c.LastName,
      MiddleNames = c.MiddleNames
    } }));
    CreateMap<Individual, IndividualIdentifiersDto>();
    CreateMap<List<Identity>, IndividualDto>();
    CreateMap<Individual, IndividualDto>().IncludeMembers(c => c.Identities)
    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(c => c.Identities[0].FirstName))
    .ForMember(dest => dest.LastName, opt => opt.MapFrom(c => c.Identities[0].LastName))
    .ForMember(dest => dest.MiddleNames, opt => opt.MapFrom(c => c.Identities[0].MiddleNames));
    CreateMap<Identity, IdentityDto>();
  }
}