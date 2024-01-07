using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByLogin(string login);
}