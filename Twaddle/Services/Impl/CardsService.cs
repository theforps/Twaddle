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
    public CardsService(ICardsRepository cardsRepository, IMapper mapper)
    {
        _cardsRepository = cardsRepository;
        _mapper = mapper;
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
}