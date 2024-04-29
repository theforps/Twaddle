using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[ProducesResponseType(StatusCodes.Status200OK)]
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
        
        var result = await _cardsService.RecommendedCardsForUser(currentUser);

        return Ok(result);
    }

    [HttpPost("report")]
    public async Task<IActionResult> SendReport(ReportDTO reportDto)
    {
        var result = await _cardsService.AddNewReport(reportDto);
        
        return Ok(result);
    }
}