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
        var result = await _db.Users.Include(x => x.Matches).ToListAsync();
        
        return result;
    }
}