using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class NewsRepository : INewsRepository
{
    private readonly AppDbContext _db;

    public NewsRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<List<News>> GetNews()
    {
        var news = await _db.News.ToListAsync();

        return news;
    }

    public async Task<News> AddNews(News news)
    {
        var result = _db.News.AddAsync(news).Result.Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public async Task<News> AddLikeToNews(int id)
    {
        var news = await _db.News.FirstOrDefaultAsync(x => x.Id == id);

        news.CountOfMarks += 1;

        var result = _db.News.Update(news).Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public async Task<bool> DeleteNews(int id)
    {
        var order = await _db.News.FirstOrDefaultAsync(x => x.Id == id);

        if (order != null)
        {
            _db.News.Remove(order);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }
}