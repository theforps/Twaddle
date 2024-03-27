using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface ILikeRepository
{
    Task AddLike(User currentUser, User liked);
    Task<List<Like>> GetUserLikes(string currentUser);
    Task<bool> LikeExist(string currentUser, string secondUser);
    Task DeleteLikes();
}