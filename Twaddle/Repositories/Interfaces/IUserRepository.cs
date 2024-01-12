using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByLogin(string login);
    Task<User> UpdateUserInfo(User user);
    Task<bool> DeleteUserInfo(User user);
}