using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface INewsRepository
{
    Task<List<News>> GetNews();
    Task<News> AddNews(News news);
    Task<News> AddLikeToNews(int id);
    Task<bool> DeleteNews(int id);
}