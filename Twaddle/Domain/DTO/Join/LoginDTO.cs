namespace Twaddle.Domain.DTO;

public class LoginDTO
{
    public string JWT { get; set; }
    public UserDTO User { get; set; }
}