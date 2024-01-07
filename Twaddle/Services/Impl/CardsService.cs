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

            List<MatchDTO> result = new List<MatchDTO>();

            foreach (var x in matches)
            {
                if (x.IsMutually)
                {
                    foreach (var c in x.Couple)
                    {
                        if (!c.Login.ToLower().Equals(userName.ToLower()))
                        {
                            result.Add(new MatchDTO()
                            {
                                Login = c.Login,
                                Name = c.Name
                            });
                        }
                    }
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

    public async Task<BaseResponse<List<MatchDTO>>> AddUserMatch(string firstLogin, string secondLogin)
    {
        try
        {
            var firstUser = await _userRepository.GetUserByLogin(firstLogin);
            var secondUser = await _userRepository.GetUserByLogin(secondLogin);

            var match = await _cardsRepository.SetUserMatch(firstUser, secondUser);

            var result = new List<MatchDTO>();
            
            foreach (var c in match.Couple)
            {
                result.Add(new MatchDTO()
                {
                    Login = c.Login,
                    Name = c.Name
                });
            }
            
            if (result == null)
            {
                return new BaseResponse<List<MatchDTO>>()
                {
                    Description = "Не удалось сохранить совпадение.",
                    StatusCode = 400
                };
            }
            
            return new BaseResponse<List<MatchDTO>>()
            {
                Data = result,
                Description = "Запрос успешно выполнен",
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
}