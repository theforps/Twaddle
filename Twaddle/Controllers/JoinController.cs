using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[Route("[controller]")]
[ApiController]
public class JoinController : ControllerBase
{
    private readonly IJoinService _joinService;

    public JoinController(IJoinService joinService)
    {
        _joinService = joinService;
    }
    
    [HttpPost("registration")]
    public async Task<IActionResult> Register(RegDTO dto)
    {
        var result = await _joinService.Registration(dto);
        
        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        
        var result = await _joinService.Login(dto);

       
        return Ok(result);
    }
    
}

