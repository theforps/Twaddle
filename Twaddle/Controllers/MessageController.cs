using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;
    public MessageController(IMessageService messageService)
    {
        _messageService = messageService;
    }
    
    [HttpGet("get-match-messages/{id}")]
    public async Task<IActionResult>  GetMessagesByMatch(int id)
    {
        string currentUser = HttpContext.User.Identity.Name;
        
        if (currentUser != null)
        {
            var result = await _messageService.GetMessages(currentUser, id);
    
            return Ok(result);
        }

        return BadRequest();
    }

    [HttpPost("send-message")]
    public async Task<IActionResult> SendMessage(SetMessageDTO messageDto)
    {
        var result = await _messageService.AddMessage(messageDto, HttpContext.User.Identity.Name);

        return Ok(result);
    }
}