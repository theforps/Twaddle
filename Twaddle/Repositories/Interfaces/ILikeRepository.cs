using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface ILikeRepository
{
    Task AddLike(string currentUser, string liked);
    Task<List<Like>> GetUserLikes(string currentUser);
    Task DeleteLikes();
}