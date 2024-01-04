using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class JoinRepository : IJoinRepository
{
    private readonly AppDbContext _db;

    public JoinRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<User> AddNewUser(User user)
    {
        bool check = await _db.Users.FirstOrDefaultAsync(
            x => x.Login.ToLower().Equals(user.Login.ToLower())) == null;

        if (check)
        {
            User result = _db.Users.AddAsync(user).Result.Entity;
            await _db.SaveChangesAsync();

            return result;
        }

        return null;
    }

    public async Task<User> GetUserByLogin(string login)
    {
        User user = await _db.Users.FirstOrDefaultAsync(
            x => x.Login.Equals(login));

        return user;
    }
}