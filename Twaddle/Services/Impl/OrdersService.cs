using AutoMapper;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class OrdersService : IOrdersService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public OrdersService(IOrderRepository orderRepository, IUserRepository userRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    
    
    public async Task<BaseResponse<List<OrderDTO>>> GetAllOrders(string currentUser)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(currentUser);
            
            var response = await _orderRepository.GetOrders(user.Id);

            var result = _mapper.Map<List<OrderDTO>>(response);
            
            if (result == null)
            {
                return new BaseResponse<List<OrderDTO>>()
                {
                    StatusCode = 404,
                    Description = "Не удалось найти заказы."
                };
            }
            
            return new BaseResponse<List<OrderDTO>>()
            {
                StatusCode = 200,
                Description = "Успешно.",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<OrderDTO>>()
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
                    StatusCode = 400,
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

    public async Task<BaseResponse<bool>> AddFeedbackToOrder(int id, Search search, string login)
    {
        try
        {
            var user = await _userRepository.GetUserByLogin(login);
            var order = await _orderRepository.GetOrderById(id);

            Feedback feedback = new Feedback()
            {
                Comment = search.key,
                Wanting = user
            };
            
            order.Feedbacks.Add(feedback);
            
            
            var result = await _orderRepository.AddFeedback(order);

            if (!result)
            {
                return new BaseResponse<bool>()
                {
                    StatusCode = 404,
                    Description = "Не удалось добавить отклик.",
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

    public async Task<BaseResponse<List<FeedbackDTO>>> GetAllFeedbackOfOrders(int id)
    {
        try
        {
            var feedbacks = await _orderRepository.GetFeedbacks(id);

            var result = _mapper.Map<List<FeedbackDTO>>(feedbacks);

            if (result == null)
            {
                return new BaseResponse<List<FeedbackDTO>>()
                {
                    StatusCode = 404,
                    Description = "Нет откликов."
                };
            }
            
            return new BaseResponse<List<FeedbackDTO>>()
            {
                StatusCode = 200,
                Description = "Успешно.",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<FeedbackDTO>>()
            {
                StatusCode = 500,
                Description = ex.Message,
            };
        }
    }
}