namespace Twaddle.Domain.DTO;

public class OrderDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; }
    public UserDTO Creator { get; set; }
    public int StartPrice { get; set; } 
    public int EndPrice { get; set; }
}