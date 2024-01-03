using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IJoinRepository
{
    User AddNewUser(User user);
}