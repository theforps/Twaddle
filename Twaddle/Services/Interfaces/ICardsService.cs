using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface ICardsService
{
    Task<BaseResponse<List<UserDTO>>> RecommendedCardsForUser(string currentUser);
    Task<BaseResponse<ReportDTO>> AddNewReport(ReportDTO reportDto);
}