using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IUserService
{
    Task<BaseResponse<UserDTO>> GetUserInfo(string login);
    Task<BaseResponse<UserDTO>> UpdateUserInfo(UserUpdateDTO userDto, string login);
    Task<BaseResponse<bool>> DeleteUserInfo(string currentUser);
}