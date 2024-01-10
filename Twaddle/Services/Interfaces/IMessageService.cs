using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IMessageService
{
    Task<BaseResponse<HistoryDTO>> GetMessages(string currentUser, int matchId);
    Task<BaseResponse<MatchDTO>> AddMessage(SetMessageDTO newMessage, string currentUser);
}