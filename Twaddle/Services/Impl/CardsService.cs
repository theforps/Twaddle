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
    private readonly ILikeRepository _likeRepository;
    public CardsService(
        ICardsRepository cardsRepository, 
        IMapper mapper, 
        ILikeRepository likeRepository)
    {
        _cardsRepository = cardsRepository;
        _mapper = mapper;
        _likeRepository = likeRepository;
    }
    
    public async Task<BaseResponse<List<UserDTO>>> RecommendedCardsForUser(string currentUser)
    {
        try
        {
            await _likeRepository.DeleteLikes(currentUser);

            var lastLikes = await _likeRepository.GetUserLikes(currentUser);
            
            var response = await _cardsRepository.GetAllCards();
            
            var users = response
                .Where(x => !lastLikes
                    .Select(c => c.Liked.ToLower())
                    .Contains(x.Login.ToLower()))
                .Where(x => x.Login != currentUser)
                .ToList();
            
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