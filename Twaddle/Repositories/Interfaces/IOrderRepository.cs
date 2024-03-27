using Twaddle.Domain.Models;

namespace Twaddle.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<List<Order>> GetOrders(int id);
    Task<Order> GetOrderById(int id);
    Task<List<Order>> GetOrdersSearch(string word);
    Task<Order> AddOrder(Order order);
    Task<bool> DeleteOrder(int id);
    Task<bool> AddFeedback(Order orders);
    Task<List<Feedback>> GetFeedbacks(int id);
    Task<bool> SetLikeFeedback(int? id, string wanting);
}