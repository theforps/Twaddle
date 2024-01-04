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

        if (result.StatusCode == 403)
        {
            return Forbid(result.Description);
        }
        else if (result.StatusCode == 500)
        {
            return Forbid(result.Description);
        }
        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var result = await _joinService.Login(dto);

        if (result.StatusCode == 403)
        {
            return StatusCode(StatusCodes.Status403Forbidden, result.Description);
        }
        else if (result.StatusCode == 500)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, result.Description);
        }
        
        return Ok(result);
    }
    
}

