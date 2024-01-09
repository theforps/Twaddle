using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class CardsRepository : ICardsRepository
{
    private readonly AppDbContext _db;
    public CardsRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<List<User>> GetAllCards()
    {
        var result = await _db.Users.ToListAsync();
        
        return result;
    }
    
    public async Task<List<Match>> GetAllMatches()
    {
        var matches = await _db.Matches
            .Include(x => x.Couple)
            .Include(x => x.Messages)
            .ToListAsync();

        return matches;
    }
    
    public async Task<List<Match>> GetUserMatches(User user)
    {
        var matches = await _db.Matches
            .Include(x => x.Couple)
            .Where(x => x.Couple.Contains(user) && x.IsMutually)
            .ToListAsync();

        return matches;
    }

    public async Task<Match> GetUserMatch(int id)
    {
        var result = await _db.Matches
            .Include(x => x.Couple)
            .Include(x => x.Messages)
            .FirstOrDefaultAsync(x => x.Id == id);

        return result;
    }

    public async Task<Match> SetUserMatch(User userSender, User userResult)
    {
        var match = await _db.Matches
            .Include(x => x.Couple)
            .FirstOrDefaultAsync(x => 
                x.Couple.Contains(userSender) && x.Couple.Contains(userResult));

        Match result;
        
        if (match != null)
        {
            match.IsMutually = true;
            result = _db.Matches.Update(match).Entity;
        }
        else
        {
            var newMatch = new Match()
            {
                Couple = new List<User>()
                {
                    userSender,
                    userResult
                }
            };
            
            result = _db.Matches.AddAsync(newMatch).Result.Entity;
        }

        await _db.SaveChangesAsync();

        return result;
    }
}