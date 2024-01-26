using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface ICardsRepository
{
    Task<List<User>> GetAllCards();
    Task<Report> AddReport(Report report);
}