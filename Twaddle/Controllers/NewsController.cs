using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.Models;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[Route("[controller]")]
[ApiController]
[Authorize]
public class NewsController : ControllerBase
{
    private readonly INewsService _newsService;

    public NewsController(INewsService newsService)
    {
        _newsService = newsService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllNews()
    {
        
        var result = await _newsService.GetNews("");
        
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<IActionResult> GetAllNews(Search search)
    {
        
        var result = await _newsService.GetNews(search.key);
        
        return Ok(result);
    }
    
    
    [HttpPost("add-news")]
    public async Task<IActionResult> CreateNews(Search search)
    {
        var username = HttpContext.User.Identity.Name;
        
        
        var result = await _newsService.AddNews(search.key, username);
        
        return Ok(result);
    }
    
    [HttpPost("set-like/{id}")]
    public async Task<IActionResult> SetLike(int id)
    {
        var username = HttpContext.User.Identity.Name;
        
        
        var result = await _newsService.SetLike(id, username);
        
        return Ok(result);
    }
    
    [HttpPost("delete-news/{id}")]
    public async Task<IActionResult> DeleteNews(int id)
    {
        
        var result = await _newsService.DeleteUserNews(id);
        
        return Ok(result);
    }
}

