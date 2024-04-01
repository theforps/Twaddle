namespace Twaddle.Domain.DTO;

public class NewOrderDTO
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int? StartPrice { get; set; } 
    public int? EndPrice { get; set; }
}