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
            updateUser.Login = login;

            // if (userDto.Images != null)
            // {
            //     foreach (var file in userDto.Images)
            //     {
            //         if (file.Length > 0)
            //         {
            //             using (var ms = new MemoryStream())
            //             {
            //                 file.CopyTo(ms);
            //                 var fileBytes = ms.ToArray();
            //                 updateUser.Pictures.Add(fileBytes);
            //             }
            //         }
            //     }
            // }

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

    public async Task<BaseResponse<bool>> DeleteUserInfo(string currentUser)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(currentUser);

            await _userRepository.DeleteUserInfo(user);
            
            var check = await _userRepository.GetUserByLogin(currentUser);
            
            if (check != null)
            {
                return new BaseResponse<bool>()
                {
                    Data = false,
                    Description = "Произошла ошибка во время удаления.",
                    StatusCode = 400
                };
            }
            
            return new BaseResponse<bool>()
            {
                Data = true,
                Description = "Удалено успешно.",
                StatusCode = 200
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<bool>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<UserDTO>> UpdateUserPassword(string currentUser, PasswordVerifyDTO passwordVerifyDto)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(currentUser);
            
            if (!BCrypt.Net.BCrypt.Verify(passwordVerifyDto.oldPassword, user.PasswordHash))
            {
                return new BaseResponse<UserDTO>()
                {
                    StatusCode = 403,
                    Description = "Неправильный пароль."
                };
            }
            
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordVerifyDto.newPassword);

            var response = await _userRepository.UpdateUserInfo(user);

            var result = _mapper.Map<UserDTO>(response);

            if (result == null)
            {
                return new BaseResponse<UserDTO>()
                {
                    StatusCode = 400,
                    Description = "Не удалось обновить."
                };
            }
            
            return new BaseResponse<UserDTO>()
            {
                Data = result,
                StatusCode = 200,
                Description = "Пароль обновлен успешно."
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<UserDTO>()
            {
                Description = ex.Message,
                StatusCode = 500
            };
        }
    }
}