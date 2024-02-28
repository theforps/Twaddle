using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByLogin(string login);
    Task<User> UpdateUserInfo(User user);
    Task DeleteUserInfo(User user);
    Task<bool> AddSub(Subscription sub);
    Task<bool> CheckSubTerm(int userId);
    Task<Subscription> GetSubscription(int userId);
}