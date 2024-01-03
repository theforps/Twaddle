using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IJoinService
{
      BaseResponse<User> Registration(RegDTO dto);
}