using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface INewsRepository
{
    Task<List<News>> GetNews(string search);
    Task<News> AddNews(News news);
    Task<News> AddLikeToNews(int id, string fanLogin);
    Task<bool> DeleteNews(int id);
}