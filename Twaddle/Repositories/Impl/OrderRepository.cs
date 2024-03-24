using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;

namespace Twaddle.Repositories.Impl;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _db;

    public OrderRepository(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<List<Order>> GetOrders()
    {
        var orders = await _db.Orders.Include(x => x.Creator).ToListAsync();

        return orders;
    }

    public async Task<Order> GetOrderById(int id)
    {
        var order = await _db.Orders.Include(x => x.Feedbacks).FirstOrDefaultAsync(x => x.Id == id);

        return order;
    }

    public async Task<List<Order>> GetOrdersSearch(string word)
    {
        var orders = await _db.Orders
            .Where(x => 
                x.Description.ToLower().Contains(word.ToLower()) || 
                x.Title.ToLower().Contains(word.ToLower()))
            .ToListAsync();

        return orders;
    }

    public async Task<Order> AddOrder(Order order)
    {
        var result = _db.Orders.AddAsync(order).Result.Entity;

        await _db.SaveChangesAsync();

        return result;
    }

    public async Task<bool> DeleteOrder(int id)
    {
        var order = await _db.Orders.FirstOrDefaultAsync(x => x.Id == id);

        if (order != null)
        {
            _db.Orders.Remove(order);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }
}