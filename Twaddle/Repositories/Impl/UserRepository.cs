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

    public async Task<bool> AddSub(Subscription sub)
    {
        var checkSub = await _db.Subscriptions
            .FirstOrDefaultAsync(x => x.Client.Id == sub.Client.Id);

        if (checkSub == null)
        {
            _db.Subscriptions.Add(sub);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<bool> CheckSubTerm(int userId)
    {
        var sub = await _db.Subscriptions
            .FirstOrDefaultAsync(x => x.Client.Id == userId);

        if (sub != null)
        {
            if (sub.EndTime <= DateTime.Now)
            {
                _db.Subscriptions.Remove(sub);
                await _db.SaveChangesAsync();

                return false;
            }
            
            return true;
        }

        return false;
    }

    public async Task<Subscription> GetSubscription(int userId)
    {
        var sub = await _db.Subscriptions
            .FirstOrDefaultAsync(x => x.Client.Id == userId);

        return sub;
    }
}