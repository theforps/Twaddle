using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IOrdersService
{
    Task<BaseResponse<List<OrderDTO>>> GetAllOrders(string currentUser);
    Task<BaseResponse<bool>> DeleteOrder(int id);
    Task<BaseResponse<bool>> AddFeedbackToOrder(int id, Search search, string login);
}