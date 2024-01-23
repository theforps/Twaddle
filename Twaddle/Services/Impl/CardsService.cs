using AutoMapper;
using Newtonsoft.Json;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class CardsService : ICardsService
{
    private readonly IMapper _mapper;
    private readonly ICardsRepository _cardsRepository;
    private readonly ILikeRepository _likeRepository;
    private readonly IRequestsService _requestsService;
    private readonly IUserRepository _userRepository;
    public CardsService(
        ICardsRepository cardsRepository, 
        IMapper mapper, 
        ILikeRepository likeRepository, 
        IRequestsService requestsService, 
        IUserRepository userRepository)
    {
        _cardsRepository = cardsRepository;
        _mapper = mapper;
        _likeRepository = likeRepository;
        _requestsService = requestsService;
        _userRepository = userRepository;
    }
    
    public async Task<BaseResponse<List<UserDTO>>> RecommendedCardsForUser(string currentUser)
    {
        try
        {
            await _likeRepository.DeleteLikes(currentUser);

            var user = await _userRepository.GetUserByLogin(currentUser);
            
            var lastLikes = await _likeRepository.GetUserLikes(currentUser);
            
            var response = await _cardsRepository.GetAllCards();
            
            var users = response
                .Where(x => 
                    !lastLikes
                    .Select(c => c.Liked.ToLower())
                    .Contains(x.Login.ToLower()))
                .Where(x => 
                    x.Login != currentUser)
                .Where(x => 
                    x.Matches
                        .Where(c => 
                            c.Couple.Contains(user) && c.IsMutually)
                        .ToList()
                        .Count() == 0)
                .ToList();

            var requestUser = _mapper.Map<UserRequestDTO>(user);
            var requestUsers = _mapper.Map<List<UserRequestDTO>>(users);
            
            var userString = JsonConvert.SerializeObject(requestUser);
            var usersString = JsonConvert.SerializeObject(requestUsers);
            
            // var token = await _requestsService.GetIamToken();
            //
            // if (token != null)
            // {
            //     var orderOfProfiles = await _requestsService.GetOrderOfUsers(token, userString, usersString);
            //
            //     if (orderOfProfiles != null)
            //     {
            //         users = users.OrderBy(x => orderOfProfiles.FindIndex(y => x.Id == y)).ToList();
            //     }
            // }

            var result = _mapper.Map<List<UserDTO>>(users);
            
            return new BaseResponse<List<UserDTO>>
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
}