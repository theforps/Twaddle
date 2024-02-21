using AutoMapper;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class NewsService : INewsService
{
    private readonly INewsRepository _newsRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public NewsService(INewsRepository newsRepository, IMapper mapper, IUserRepository userRepository)
    {
        _newsRepository = newsRepository;
        _mapper = mapper;
        _userRepository = userRepository;
    }


    public async Task<BaseResponse<List<News>>> GetNews(string search)
    {
        try
        {
            var request = await _newsRepository.GetNews(search);
            

            
            return new BaseResponse<List<News>>()
            {
                StatusCode = 200,
                Description = "Выполнено успешно",
                Data = request
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<News>>()
            {
                StatusCode = 500,
                Description = ex.Message
            };
        }
    }

    public async Task<BaseResponse<News>> AddNews(string content, string currentUser)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(currentUser);

            if (user == null)
            {
                return new BaseResponse<News>()
                {
                    StatusCode = 404,
                    Description = "Пользователь не найден"
                };
            }
            
            News newNews = new News()
            {
                Description = content,
                Creator = user,
                Fans = new List<string>()
            };

            var result = await _newsRepository.AddNews(newNews);

            return new BaseResponse<News>()
            {
                Data = result,
                StatusCode = 200,
                Description = "Успешно выполнено"
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<News>()
            {
                StatusCode = 500,
                Description = ex.Message
            };
        }
    }

    public async Task<BaseResponse<News>> SetLike(int id, string currentUser)
    {
        try
        {
            var result = await _newsRepository.AddLikeToNews(id, currentUser);
            
            
            return new BaseResponse<News>()
            {
                Data = result,
                StatusCode = 200,
                Description = "Выполнено успешно"
            };
            
        }
        catch (Exception ex)
        {
            return new BaseResponse<News>()
            {
                StatusCode = 500,
                Description = ex.Message
            };
        }
    }
}