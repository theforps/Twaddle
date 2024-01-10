using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class MessageService : IMessageService
{
    private readonly IMapper _mapper;
    private readonly IMatchRepository _matchRepository;
    private readonly IUserRepository _userRepository;
    public MessageService(IMapper mapper, IMatchRepository matchRepository, IUserRepository userRepository)
    {
        _mapper = mapper;
        _matchRepository = matchRepository;
        _userRepository = userRepository;
    }
    
    public async Task<BaseResponse<HistoryDTO>> GetMessages(string currentUser, int matchId)
    {
        try
        {
            var result = await _matchRepository.GetUserMatchByMatchId(matchId);

            List<MessageDTO> tempHistory = new List<MessageDTO>();

            foreach (var x in result.Messages)
            {
                tempHistory.Add(new MessageDTO()
                {
                    Content = x.Content,
                    CreatedTime = x.CreatedTime,
                    IsSender = !x.Sender.Login.ToLower().Equals(currentUser.ToLower()),
                    Login = x.Sender.Login
                });
            }

            HistoryDTO dto = new HistoryDTO()
            {
                MatchId = matchId,
                Messages = tempHistory,
                SenderInfo = _mapper.Map<UserDTO>(result.Couple
                    .FirstOrDefault(x => !x.Login.ToLower().Equals(currentUser.ToLower())))
            };
    
            if (result == null)
            {
                return new BaseResponse<HistoryDTO>()
                {
                    Description = "Совпадение не найдено.",
                    StatusCode = 404
                };
            }
    
            return new BaseResponse<HistoryDTO>()
            {
                Data = dto,
                Description = "Выполнено успешно.",
                StatusCode = 200
            };
    
        }
        catch (Exception ex)
        {
            return new BaseResponse<HistoryDTO>()
            {
                Description = ex.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<MatchDTO>> AddMessage(SetMessageDTO newMessage, string currentUser)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(currentUser);
            var match = await _matchRepository.GetUserMatchByMatchId(newMessage.MatchId);
                
            var message = new Message()
            {
                Content = newMessage.MessageContent,
                Sender = user
            };

            if (match.Messages == null)
            {
                match.Messages = new List<Message>();
            }
            match.Messages.Add(message);

            var response = await _matchRepository.UpdateMatch(match);

            var result = _mapper.Map<MatchDTO>(response);
            
            return new BaseResponse<MatchDTO>()
            {
                Data = result,
                Description = "Выполнено успешно.",
                StatusCode = 200
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<MatchDTO>()
            {
                Description = ex.Message,
                StatusCode = 500
            };
        }
    }
}