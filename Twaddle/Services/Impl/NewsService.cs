using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class NewsService : INewsService
{
    private readonly INewsRepository _newsRepository;
    private readonly IMapper _mapper;

    public NewsService(INewsRepository newsRepository, IMapper mapper)
    {
        _newsRepository = newsRepository;
        _mapper = mapper;
    }


    public async Task<BaseResponse<List<NewsDTO>>> GetNews(string search)
    {
        try
        {
            var request = await _newsRepository.GetNews(search);

            var result = _mapper.Map<List<NewsDTO>>(request);

            
            return new BaseResponse<List<NewsDTO>>()
            {
                StatusCode = 200,
                Description = "Выполнено успешно",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<NewsDTO>>()
            {
                StatusCode = 500,
                Description = ex.Message
            };
        }
    }
}