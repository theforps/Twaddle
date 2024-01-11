using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }
    
    public async Task<BaseResponse<UserDTO>> GetUserInfo(string login)
    {
        try
        {
            var response = await _userRepository.GetUserByLogin(login);

            if (response == null)
            {
                return new BaseResponse<UserDTO>()
                {
                    Description = "Пользователь не найден.",
                    StatusCode = 404
                };
            }

            var result = _mapper.Map<UserDTO>(response);
            
            return new BaseResponse<UserDTO>()
            {
                Data = result,
                Description = "Пользователь найден.",
                StatusCode = 200
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<UserDTO>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<UserDTO>> UpdateUserInfo(UserDTO userDto, string login)
    {
        try
        {
            var oldUser = await _userRepository.GetUserByLogin(login);
            var newUser = _mapper.Map<User>(userDto);
            
            var updateUser = _mapper.Map(newUser, oldUser);
            
            var response = await _userRepository.UpdateUserInfo(updateUser);
            
            if (response == null)
            {
                return new BaseResponse<UserDTO>()
                {
                    Description = "Изменения не сохранены.",
                    StatusCode = 403
                };
            }
            
            var result = _mapper.Map<UserDTO>(response);
            
            return new BaseResponse<UserDTO>()
            {
                Data = result,
                Description = "Изменения сохранены.",
                StatusCode = 200
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<UserDTO>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }
}