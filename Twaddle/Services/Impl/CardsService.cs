using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class CardsService : ICardsService
{
    private readonly IMapper _mapper;
    private readonly ICardsRepository _cardsRepository;
    private readonly IUserRepository _userRepository;
    public CardsService(ICardsRepository cardsRepository, IMapper mapper, IUserRepository userRepository)
    {
        _cardsRepository = cardsRepository;
        _mapper = mapper;
        _userRepository = userRepository;
    }

    #region match
    public async Task<BaseResponse<List<UserDTO>>> RecommendedCardsForUser(string currentUser)
    {
        try
        {
            var response = await _cardsRepository.GetAllCards();

            var users = response.Where(x => x.Login != currentUser).ToList();
            
            var result = _mapper.Map<List<UserDTO>>(users);
            
            return new BaseResponse<List<UserDTO>>()
            {
                Data = result,
                Description = "Запрос успешно выполнен",
                StatusCode = 200
            };
        }
        catch(Exception ex)
        {
            return new BaseResponse<List<UserDTO>>()
            {
                Description = ex.Message,
                StatusCode = 500
            };
        }
    }

    public async Task<BaseResponse<List<MatchDTO>>> GetUserMatches(string userName)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(userName);

            var matches = await _cardsRepository.GetUserMatches(user);

            var result = _mapper.Map<List<MatchDTO>>(matches);

            foreach (var x in result)
            {
                foreach (var c in matches)
                {
                    x.Pair = c.Couple.FirstOrDefault(x => !x.Login.ToLower().Equals(userName.ToLower()));
                }
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

    public async Task<BaseResponse<MatchDTO>> GetUserMatch(int id, string userName)
    {
        try
        {
            var response = await _cardsRepository.GetUserMatch(id);

            var result = _mapper.Map<MatchDTO>(response);
            
            result.Pair = response.Couple.FirstOrDefault(x => !x.Login.ToLower().Equals(userName.ToLower()));
            
            if (result == null)
            {
                return new BaseResponse<MatchDTO>()
                {
                    Description = "Совпадение не было найдено.",
                    StatusCode = 404
                };
            }
            
            return new BaseResponse<MatchDTO>()
            {
                Data = result,
                Description = "Выполнено успешно.",
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

    public async Task<BaseResponse<MatchDTO>> AddUserMatch(string currentUser, string secondLogin)
    {
        try
        {
            var firstUser = await _userRepository.GetUserByLogin(currentUser);
            var secondUser = await _userRepository.GetUserByLogin(secondLogin);
    
            var match = await _cardsRepository.SetUserMatch(firstUser, secondUser);

            var result = _mapper.Map<MatchDTO>(match);
            result.Pair = match.Couple.FirstOrDefault(x => !x.Login.ToLower().Equals(currentUser.ToLower()));
            
            if (result == null)
            {
                return new BaseResponse<MatchDTO>()
                {
                    Description = "Не удалось сохранить совпадение.",
                    StatusCode = 400
                };
            }
            
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
    
    #endregion

    #region messages

    // public async Task<BaseResponse<Match>> GetMessages(int matchId)
    // {
    //     try
    //     {
    //         var result = await _cardsRepository.GetMatchById(matchId);
    //
    //         if (result == null)
    //         {
    //             return new BaseResponse<Match>()
    //             {
    //                 Description = "Совпадение не найдено.",
    //                 StatusCode = 404
    //             };
    //         }
    //
    //         return new BaseResponse<Match>()
    //         {
    //             Data = result,
    //             Description = "Выполнено успешно.",
    //             StatusCode = 200
    //         };
    //
    //     }
    //     catch (Exception ex)
    //     {
    //         return new BaseResponse<Match>()
    //         {
    //             Description = ex.Message,
    //             StatusCode = 500
    //         };
    //     }
    // }

    #endregion
}