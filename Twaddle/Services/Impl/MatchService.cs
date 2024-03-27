using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class MatchService : IMatchService
{
    private readonly IUserRepository _userRepository;
    private readonly IMatchRepository _matchRepository;
    private readonly IMapper _mapper;
    private readonly ILikeRepository _likeRepository;
    private readonly IOrderRepository _orderRepository;
    public MatchService(
        IUserRepository userRepository, 
        IMapper mapper, 
        IMatchRepository matchRepository, 
        ILikeRepository likeRepository, IOrderRepository orderRepository)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _matchRepository = matchRepository;
        _likeRepository = likeRepository;
        _orderRepository = orderRepository;
    }
    
    public async Task<BaseResponse<List<MatchDTO>>> GetUserMatches(string userName)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(userName);

            var matches = await _matchRepository.GetUserMatchesMutually(user);

            var result = _mapper.Map<List<MatchDTO>>(matches);

            for(int i = 0; i < result.Count; i++)
            {
                result[i].Pair = matches[i].Couple
                    .FirstOrDefault(x => 
                        !x.Login.ToLower().Equals(userName.ToLower()))!;
            }
            
            if (result == null || result.Count == 0)
            {
                return new BaseResponse<List<MatchDTO>>()
                {
                    Description = "У пользователя нет сопадений.",
                    StatusCode = 404
                };
            }
            
            return new BaseResponse<List<MatchDTO>>()
            {
                Data = result,
                Description = "Успешно выполнено.",
                StatusCode = 200
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<List<MatchDTO>>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<MatchDTO>> GetUserMatchByOrder(string wantingUser, int orderId)
    {
        try
        {
            var match = await _matchRepository.GetUserMatchByOrderId(wantingUser, orderId);

            var result = _mapper.Map<MatchDTO>(match);
            
            if (result == null)
            {
                return new BaseResponse<MatchDTO>()
                {
                    Description = "Совпадение не найдено",
                    StatusCode = 404
                };
            }
            
            return new BaseResponse<MatchDTO>()
            {
                Data = result,
                Description = "Успешно выполнено.",
                StatusCode = 200
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<MatchDTO>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<MatchDTO>> AddUserMatch(string currentUser, string secondLogin, int? orderId)
    {
        try
        {
            var checkCurrent = await _likeRepository.LikeExist(currentUser, secondLogin);
            var firstUser = await _userRepository.GetUserByLogin(currentUser);
            var secondUser = await _userRepository.GetUserByLogin(secondLogin);
            Match match = null;
            
            if (orderId != null)
            {
                match = await _matchRepository.SetUserMatch(firstUser, secondUser, orderId);

                await _orderRepository.SetLikeFeedback(orderId, secondLogin);
            }
            else if (checkCurrent)
            {
                return new BaseResponse<MatchDTO>()
                {
                    Description = "Пользователь уже ранее отмечал того же пользователя.",
                    StatusCode = 200
                };
            }

            await _likeRepository.AddLike(firstUser, secondUser);
            
            checkCurrent = await _likeRepository.LikeExist(currentUser, secondLogin);
            var checkSecond = await _likeRepository.LikeExist(secondLogin, currentUser);
            
            if (checkCurrent && checkSecond)
            {
                match = await _matchRepository.SetUserMatch(firstUser, secondUser, null);
            }

            if (match == null)
            {
                return new BaseResponse<MatchDTO>()
                {
                    Description = "Мэтч не произошел",
                    StatusCode = 400
                };
            }
            var result = _mapper.Map<MatchDTO>(match);
            result.Pair = match.Couple
                .FirstOrDefault(x => 
                    !x.Login.ToLower().Equals(currentUser.ToLower()));
            
            return new BaseResponse<MatchDTO>()
            {
                Data = result,
                Description = "Запрос успешно выполнен",
                StatusCode = 200
            };
            
            
        }
        catch (Exception e)
        {
            return new BaseResponse<MatchDTO>()
            {
                Description = e.Message,
                StatusCode = 500
            };
        }
    }
}