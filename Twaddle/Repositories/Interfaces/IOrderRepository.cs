using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<List<Order>> GetOrders();
    Task<Order> GetOrderById(int id);
    Task<List<Order>> GetOrdersSearch(string word);
    Task<Order> AddOrder(Order order);
    Task<bool> DeleteOrder(int id);
}