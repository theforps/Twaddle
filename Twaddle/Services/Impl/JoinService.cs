using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Twaddle.Domain.DTO;
using Twaddle.Domain.Models;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class JoinService : IJoinService
{
    private readonly IJoinRepository _joinRepository;
    private readonly IConfiguration _configuration;

    public JoinService(IJoinRepository joinRepository, IConfiguration configuration)
    {
        _joinRepository = joinRepository;
        _configuration = configuration;
    }
    
    public async Task<BaseResponse<User>> Registration(RegDTO dto)
    {
        try
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<RegDTO, User>());
            var mapper = config.CreateMapper();

            User user = mapper.Map<User>(dto);

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            
            var result = await _joinRepository.AddNewUser(user);
 
            if (result == null)
            {
                return new BaseResponse<User>()
                {
                    Description = "Такой пользователь уже создан. Измените ваш логин.",
                    StatusCode = 403
                };
            }
            
            return new BaseResponse<User>()
            {
                Data = user,
                StatusCode = 200,
                Description = "Регистрация прошла успешно."
            };
        }
        catch (Exception e)
        {
            return new BaseResponse<User>()
            {
                StatusCode = 500,
                Description = e.Message
            };
        }
    }
    
    public async Task<BaseResponse<string>> Login(LoginDTO dto)
    {
        try
        {
            User user = await _joinRepository.GetUserByLogin(dto.Login);

            if (user == null)
            {
                return new BaseResponse<string>()
                {
                    StatusCode = 403,
                    Description = "Пользователя с таким Логином не существует."
                };
            }
            
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return new BaseResponse<string>()
                {
                    StatusCode = 403,
                    Description = "Неправильный пароль."
                };
            }

            string Token = CreateToken(user);
            
            return new BaseResponse<string>()
            {
                StatusCode = 200,
                Data = Token,
                Description = "Вход успешно выполнен."
            };
            
        }
        catch (Exception e)
        {
            return new BaseResponse<string>()
            {
                StatusCode = 500,
                Description = e.Message
            };
        }
    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim> {
            new Claim(ClaimTypes.Name, user.Login),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}