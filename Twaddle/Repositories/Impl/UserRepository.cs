using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;
    public UserRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<User> GetUserByLogin(string login)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(x => 
                x.Login.ToLower().Equals(login.ToLower()));

        return user;
    }

    public async Task<User> UpdateUserInfo(User user)
    {
        var result = _db.Users.Update(user).Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public async Task DeleteUserInfo(User user)
    {
        _db.Users.Remove(user);

        await _db.SaveChangesAsync();
    }
}