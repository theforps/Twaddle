using Microsoft.AspNetCore.Mvc;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
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
    
    [HttpPost]
    public BaseResponse<User> Create(RegDTO dto)
    {
        var result = _joinService.Registration(dto);

        return result;
    }


}

