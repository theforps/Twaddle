using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Services.Interfaces;

namespace Twaddle.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("get-info")]
    public async Task<IActionResult> GetInfo()
    {
        var currentUser = HttpContext.User.Identity.Name;

        var result = await _userService.GetUserInfo(currentUser);
        
        return Ok(result);
    }
    
    [HttpPut("update-info")]
    public async Task<IActionResult> UpdateInfo(UserDTO userDto)
    {
        var currentUser = HttpContext.User.Identity.Name;

        var result = await _userService.UpdateUserInfo(userDto, currentUser);
        
        return Ok(result);
    }
    
    [HttpDelete("delete-info")]
    public async Task<IActionResult> DeleteInfo()
    {
        var currentUser = HttpContext.User.Identity.Name;

        var result = await _userService.DeleteUserInfo(currentUser);
        
        return Ok(result);
    }
    
    [HttpPut("update-password")]
    public async Task<IActionResult> UpdateUserPassword(PasswordVerifyDTO passwordVerifyDto)
    {
        var currentUser = HttpContext.User.Identity.Name;

        var result = await _userService.UpdateUserPassword(currentUser, passwordVerifyDto);
        
        return Ok(result);
    }

    [HttpPost("arrange-sub")]
    public async Task<IActionResult> ArrangeSub(Search search)
    {
        var currentUser = HttpContext.User.Identity.Name;

        var response = await _userService.AddNewSubscription(currentUser, search.key);

        return Ok(response);
    }
}