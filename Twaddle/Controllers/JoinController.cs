using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[ProducesResponseType(StatusCodes.Status200OK)]
[Route("[controller]")]
[ApiController]
public class JoinController : ControllerBase
{
    private readonly IJoinService _joinService;
    private readonly IRequestsService _requestsService;
    public JoinController(IJoinService joinService, IRequestsService requestsService)
    {
        _joinService = joinService;
        _requestsService = requestsService;
    }
    
    [HttpPost("registration")]
    public async Task<IActionResult> Register(RegDTO dto)
    {
       
        var result = await _joinService.Registration(dto);
        
        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(EntryDTO dto)
    {
        var result = await _joinService.Login(dto);
       
        return Ok(result);
    }
    
}

