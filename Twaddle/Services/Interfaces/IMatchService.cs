using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IMatchService
{
    Task<BaseResponse<List<MatchDTO>>> GetUserMatches(string userName);
    Task<BaseResponse<MatchDTO>> AddUserMatch(string firstLogin, string secondLogin);
}