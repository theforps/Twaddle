using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface ICardsRepository
{
    Task<List<User>> GetAllCards();
    Task<List<Match>> GetUserMatches(User user);
    Task<Match> GetUserMatch(int id);
    Task<Match> SetUserMatch(User userSender, User useResult);
}