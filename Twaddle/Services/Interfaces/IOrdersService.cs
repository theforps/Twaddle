using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IOrdersService
{
    Task<BaseResponse<List<OrderDTO>>> GetAllOrders(string currentUser, string search);
    Task<BaseResponse<OrderDTO>> AddNewOrder(string currentUser, NewOrderDTO orderDto);
    Task<BaseResponse<bool>> DeleteOrder(int id);
    Task<BaseResponse<bool>> AddFeedbackToOrder(int id, Search search, string login);
    Task<BaseResponse<List<FeedbackDTO>>> GetAllFeedbackOfOrders(int id);
}