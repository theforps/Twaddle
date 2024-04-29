using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[Route("[controller]")]
[ApiController]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrdersService _ordersService;
    public OrdersController(IOrdersService ordersService)
    {
        _ordersService = ordersService;
    }
    
    [HttpGet("all-orders")]
    public async Task<IActionResult>  GetOrders()
    {
        var login = HttpContext.User.Identity.Name;
        
        var result = await _ordersService.GetAllOrders(login, "");

        return Ok(result);
    }
    
    [HttpPost("all-orders")]
    public async Task<IActionResult>  GetOrders(Search search)
    {
        var login = HttpContext.User.Identity.Name;
        
        var result = await _ordersService.GetAllOrders(login, search.key);

        return Ok(result);
    }
    
    [HttpPost("add-order")]
    public async Task<IActionResult>  AddOrder(NewOrderDTO newOrderDto)
    {

        var username = HttpContext.User.Identity.Name;

        var result = await _ordersService.AddNewOrder(username, newOrderDto);

        return Ok(result);
    }
    
    [HttpDelete("delete-order/{id}")]
    public async Task<IActionResult>  DeleteOrder(int id)
    {

        var result = await _ordersService.DeleteOrder(id);

        return Ok(result);
    }
    
    [HttpPost("send-feedback/{id}")]
    public async Task<IActionResult>  SendFeedback(Search search, int id)
    {
        var login = HttpContext.User.Identity.Name;
        
        var result = await _ordersService.AddFeedbackToOrder(id, search, login);

        return Ok(result);
    }
    
    [HttpGet("get-feedbacks-order/{id}")]
    public async Task<IActionResult>  GetFeedbacks(int id)
    {
        var result = await _ordersService.GetAllFeedbackOfOrders(id);
    
        return Ok(result);
    }
}