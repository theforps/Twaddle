using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class MatchController : ControllerBase
{
    private readonly IMatchService _matchService;
    public MatchController(IMatchService matchService)
    {
        _matchService = matchService;
    }
    
    [HttpGet("user-matches")]
    public async Task<IActionResult>  GetUserMatches()
    {
        string currentUser = HttpContext.User.Identity.Name;

        if (currentUser != null)
        {
            var result = await _matchService.GetUserMatches(currentUser);

            return Ok(result);
        }

        return BadRequest();
    }
    
    [HttpPost("set-match")]
    public async Task<IActionResult>  SetUserMatch(SetMatchDTO secondLogin)
    {
        string currentUser = HttpContext.User.Identity.Name;
    
        if (currentUser != null)
        {
            var result = await _matchService.AddUserMatch(currentUser, secondLogin.SecondLogin);
    
            return Ok(result);
        }
    
        return BadRequest();
    }
}