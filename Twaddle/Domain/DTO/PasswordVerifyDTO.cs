namespace Twaddle.Domain.Models;

public class PasswordVerifyDTO
{
    public string oldPassword { get; set; }
    public string newPassword { get; set; }
}