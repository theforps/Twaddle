using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class JoinService : IJoinService
{
    private readonly IJoinRepository _joinRepository;

    public JoinService(IJoinRepository joinRepository)
    {
        _joinRepository = joinRepository;
    }
    
    public BaseResponse<User> Registration(RegDTO dto)
    {
        try
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<RegDTO, User>());
            var mapper = config.CreateMapper();

            User user = mapper.Map<User>(dto);

            var result = _joinRepository.AddNewUser(user);
 
            if (result == null)
            {
                return new BaseResponse<User>()
                {
                    Description = "Такой пользователь уже создан. Измените ваш логин."
                };
            }
            
            return new BaseResponse<User>()
            {
                Data = result,
                Description = "Регистрация прошла успешно."
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<User>()
            {
                Description = e.Message
            };
        }
    }
}