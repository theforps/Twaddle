using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IJoinRepository
{
    Task<User> AddNewUser(User user);
    Task<User> GetUserByLogin(string login);
}