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
    
    public async Task<List<Order>> GetOrders(int id)
    {
        var orders = await _db.Orders
            .Include(x => x.Creator)
            .Where(x => x.Feedbacks
                .Where(c => c.Wanting.Id == id).Count() == 0)
            .ToListAsync();

        return orders;
    }

    public async Task<Order> GetOrderById(int id)
    {
        var order = await _db.Orders
            .Include(x => x.Feedbacks)
            .FirstOrDefaultAsync(x => x.Id == id);

        return order;
    }

    public async Task<List<Order>> GetOrdersSearch(string word)
    {
        var orders = await _db.Orders
            .Include(x => x.Creator)
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

    public async Task<bool> AddFeedback(Order order)
    {
        var result = _db.Orders.Update(order).Entity;

        if (result != null)
        {
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<List<Feedback>> GetFeedbacks(int id)
    {
        var feedbacks = await _db.Orders
            .Include(x => x.Feedbacks)
            .ThenInclude(c => c.Wanting)
            .Where(x => x.Id == id)
            .SelectMany(x => x.Feedbacks)
            .ToListAsync();

        return feedbacks;
    }

    public async Task<bool> SetLikeFeedback(int? id, string wanting)
    {
        var order = await _db.Orders
            .Include(x => x.Feedbacks)
            .ThenInclude(c => c.Wanting)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        var feedbacks = order
            .Feedbacks
            .FirstOrDefault(x => x.Wanting.Login.ToLower().Equals(wanting.ToLower()));

        feedbacks.IsLike = true;

        var result = _db.Orders.Update(order).Entity;

        if(result != null)
        {
            await _db.SaveChangesAsync();
            return true;
        }

        return false;
    }
}