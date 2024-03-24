using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class OrdersService : IOrdersService
{
    private readonly IOrderRepository _orderRepository;
    public OrdersService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }
    
    
    public async Task<BaseResponse<List<Order>>> GetAllOrders()
    {
        try
        {
            var result = await _orderRepository.GetOrders();

            if (result == null)
            {
                return new BaseResponse<List<Order>>()
                {
                    StatusCode = 404,
                    Description = "Не удалось найти заказы."
                };
            }
            
            return new BaseResponse<List<Order>>()
            {
                StatusCode = 200,
                Description = "Успешно.",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<Order>>()
            {
                StatusCode = 500,
                Description = ex.Message
            };
        }
    }

    public async Task<BaseResponse<bool>> DeleteOrder(int id)
    {
        try
        {
            var result = await _orderRepository.DeleteOrder(id);

            if (!result)
            {
                return new BaseResponse<bool>()
                {
                    StatusCode = 404,
                    Description = "Не удалось удалить заказ.",
                    Data = false
                };
            }
            
            return new BaseResponse<bool>()
            {
                StatusCode = 200,
                Description = "Успешно.",
                Data = true
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<bool>()
            {
                StatusCode = 500,
                Description = ex.Message,
                Data = false
            };
        }
    }
}