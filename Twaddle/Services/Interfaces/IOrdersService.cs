using Twaddle.Domain.Models;

namespace Twaddle.Services.Interfaces;

public interface IOrdersService
{
    Task<BaseResponse<List<Order>>> GetAllOrders();
    Task<BaseResponse<bool>> DeleteOrder(int id);
}