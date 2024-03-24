using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

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

        var result = await _ordersService.GetAllOrders();

        return Ok(result);
    }
    
    [HttpDelete("delete-order/{id}")]
    public async Task<IActionResult>  GetOrders(int id)
    {

        var result = await _ordersService.DeleteOrder(id);

        return Ok(result);
    }
}