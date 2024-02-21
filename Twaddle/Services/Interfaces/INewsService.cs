using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface INewsService
{
    Task<BaseResponse<List<News>>> GetNews(string search);
    Task<BaseResponse<News>> AddNews(string content, string currentUser);
    Task<BaseResponse<News>> SetLike(int id, string currentUser);
}