using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class CardsController : ControllerBase
{
    private readonly ICardsService _cardsService;
    public CardsController(ICardsService cardsService)
    {
        _cardsService = cardsService;
    }
    
    [HttpGet("forms")]
    public async Task<IActionResult>  GetCardsOfUsers()
    {
        string currentUser = HttpContext.User.Identity.Name;

        if (currentUser != null)
        {
            var result = await _cardsService.RecommendedCardsForUser(currentUser);

            return Ok(result);
        }

        return Unauthorized();
    }
    
    [HttpGet("matches")]
    public async Task<IActionResult>  GetUserMatches()
    {
        string currentUser = HttpContext.User.Identity.Name;

        if (currentUser != null)
        {
            var result = await _cardsService.GetUserMatches(currentUser);

            return Ok(result);
        }

        return Unauthorized();
    }
    
    [HttpPost("set-match")]
    public async Task<IActionResult>  SetUserMatch(SetMatchDTO secondLogin)
    {
        string currentUser = HttpContext.User.Identity.Name;
    
        if (currentUser != null)
        {
            var result = await _cardsService.AddUserMatch(currentUser, secondLogin.SecondLogin);
    
            return Ok(result);
        }
    
        return Unauthorized();
    }
    
    [HttpGet("get-match/{id}")]
    public async Task<IActionResult>  GetUserMatch(int id)
    {
        string currentUser = HttpContext.User.Identity.Name;
    
        if (currentUser != null)
        {
            var result = await _cardsService.GetUserMatch(id, currentUser);
    
            return Ok(result);
        }
    
        return Unauthorized();
    }
}