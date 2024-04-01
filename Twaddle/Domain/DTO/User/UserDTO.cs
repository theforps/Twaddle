namespace Twaddle.Domain.DTO;

public class UserDTO
{
    public string? Login { get; set; }
    public string Sex { get; set; }
    public string Name { get; set; }
    public string Goal { get; set; }
    public int Age { get; set; }
    public string Country { get; set; }
    public string Education { get; set; }
    public string Description { get; set; }
    public string Role { get; set; }
    public List<byte[]>? Images { get; set; }
}