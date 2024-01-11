using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Mapping;

public class CardMapping : Profile
{
    public CardMapping()
    {
        CreateMap<User, User>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.Matches, opt => opt.Ignore())
            .ForMember(x => x.PasswordHash, opt => opt.Ignore());
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<Match, MatchDTO>().ReverseMap();
    }
}