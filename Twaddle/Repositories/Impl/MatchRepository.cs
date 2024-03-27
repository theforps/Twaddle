using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class MatchRepository : IMatchRepository
{
    private readonly AppDbContext _db;
    public MatchRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<List<Match>> GetUserMatchesMutually(User user)
    {
        var matches = await _db.Matches
            .Include(x => x.Couple)
            .Include(x => x.Messages)
            .AsSplitQuery()
            .Where(x => x.Couple.Contains(user) && x.IsMutually)
            .ToListAsync();

        return matches;
    }

    public async Task<Match> GetUserMatchByMatchId(int matchId)
    {
        var result = await _db.Matches
            .Include(x => x.Couple)
            .Include(x => x.Messages)
            .AsSplitQuery()
            .FirstOrDefaultAsync(x => x.Id == matchId);

        return result;
    }

    public async Task<Match> SetUserMatch(User userSender, User userResult, int? orderId)
    {
        Match result;
        
        if (orderId != null)
        {
            var order = await _db.Orders
                .FirstOrDefaultAsync(x => x.Id == orderId);
            
            var newMatch = new Match()
            {
                Couple = new List<User>()
                {
                    userSender,
                    userResult
                },
                Order = order
            };
            
            result = _db.Matches.AddAsync(newMatch).Result.Entity;
        }
        else
        {
            var newMatch = new Match()
            {
                IsMutually = true,
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

    public async Task<Match> UpdateMatch(Match match)
    {
        var result = _db.Matches.Update(match).Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public Task<Match> GetUserMatchByOrderId(string wantingUser, int orderId)
    {
        var result = _db.Matches
            .Where(x => x.Order.Feedbacks
                .Where(c => c.Wanting.Login.ToLower().Equals(wantingUser.ToLower())).Count() > 0)
            .FirstOrDefaultAsync(x => x.Order.Id == orderId);

        return result;
    }
}