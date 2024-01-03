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
    
    public User AddNewUser(User user)
    {
        bool check = _db.Users.FirstOrDefault(
            x => x.Login.ToLower().Equals(user.Login.ToLower())) == null;

        if (check)
        {
            User result = _db.Users.AddAsync(user).Result.Entity;
            _db.SaveChanges();

            return result;
        }

        return null;
    }
}