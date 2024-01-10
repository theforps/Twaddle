using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IMatchRepository
{
    Task<List<Match>> GetUserMatchesMutually(User user);
    Task<Match> GetUserMatchByMatchId(int matchId);
    Task<Match> SetUserMatch(User userSender, User useResult);
    Task<Match> UpdateMatch(Match match);
}