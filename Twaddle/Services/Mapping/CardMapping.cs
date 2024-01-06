using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Mapping;

public class CardMapping : Profile
{
    public CardMapping()
    {
        CreateMap<User, UserDTO>().ReverseMap();
    }
}