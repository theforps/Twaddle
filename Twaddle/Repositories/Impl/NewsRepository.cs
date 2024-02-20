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
    
    public async Task<List<News>> GetNews(string? search)
    {
        var news = await _db.News
            .Where(x => 
                x.Description.ToLower().Contains(search!.ToLower().Trim()))
            .Include(x => x.Creator)
            .ToListAsync();

        return news;
    }

    public async Task<News> AddNews(News news)
    {
        var result = _db.News.AddAsync(news).Result.Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public async Task<News> AddLikeToNews(int id, string fanLogin)
    {
        var news = await _db.News.FirstOrDefaultAsync(x => x.Id == id);

        news.Fans.Add(fanLogin);

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