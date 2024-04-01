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
        CreateMap<User, UserDTO>().ForMember(x => 
            x.Images, opt => opt.MapFrom(x => x.Pictures)).ReverseMap();
        CreateMap<Match, MatchDTO>().ReverseMap();
        CreateMap<User, UserRequestDTO>().ReverseMap();
        CreateMap<News, NewsDTO>().ReverseMap();
        CreateMap<Subscription, SubDTO>().ReverseMap();
        CreateMap<Order, OrderDTO>().ReverseMap();
        CreateMap<Order, NewOrderDTO>().ReverseMap();
        CreateMap<Feedback, FeedbackDTO>().ReverseMap();
    }
}