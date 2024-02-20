using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface INewsService
{
    Task<BaseResponse<List<NewsDTO>>> GetNews(string search);
}