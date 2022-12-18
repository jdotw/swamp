using People.DTOs;
using People.Models;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<CreateIndividualIdentityDto, Identity>();
    CreateMap<CreateIndividualDto, Individual>().ForMember(dest => dest.Identities, opt => opt.MapFrom(c => new List<Identity> { new Identity {
      FirstName = c.Identity.FirstName,
      LastName = c.Identity.LastName,
      MiddleNames = c.Identity.MiddleNames
    } }));
    CreateMap<Individual, IndividualDto>().ForMember(dest => dest.Identity, opt => opt.MapFrom(c => c.Identities.FirstOrDefault()));
    CreateMap<Identity, IdentityDto>();
  }
}