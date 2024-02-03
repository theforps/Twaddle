using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IJoinService
{
      Task<BaseResponse<LoginDTO>> Registration(RegDTO dto);
      Task<BaseResponse<LoginDTO>> Login(EntryDTO dto);
}