using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class LikeRepository : ILikeRepository
{
    private readonly AppDbContext _db;
    public LikeRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task AddLike(string currentUser, string liked)
    {
        _db.Likes.Add(new Like()
        {
            Liker = currentUser,
            Liked = liked
        });

        await _db.SaveChangesAsync();
    }

    public async Task<List<Like>> GetUserLikes(string currentUser)
    {
        var result = await _db.Likes
            .Where(x => 
                x.Liker.ToLower().Equals(currentUser.ToLower()))
            .ToListAsync();

        return result;
    }

    public async Task DeleteLikes(string currentUser)
    {
        var oldLikes = await _db.Likes
            .Where(x => (DateTime.Now - x.DateOfLike).Days >= 1)
            .ToListAsync();
        
        _db.Likes.RemoveRange(oldLikes);
        await _db.SaveChangesAsync();
    }
}