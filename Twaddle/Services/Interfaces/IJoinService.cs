using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IJoinService
{
      Task<BaseResponse<User>> Registration(RegDTO dto);
      Task<BaseResponse<string>> Login(LoginDTO dto);
}