using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IUserService
{
    Task<BaseResponse<UserDTO>> GetUserInfo(string login);
    Task<BaseResponse<UserDTO>> UpdateUserInfo(UserDTO userDto, string login);
    Task<BaseResponse<bool>> DeleteUserInfo(string currentUser);
    Task<BaseResponse<UserDTO>> UpdateUserPassword(string currentUser, PasswordVerifyDTO passwordVerifyDto);
    Task<BaseResponse<SubDTO>> AddNewSubscription(string login, string period);
    Task<BaseResponse<SubDTO>> GetSubscription(string login);
}