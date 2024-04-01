namespace Twaddle.Domain.DTO;

public class FeedbackDTO
{
    public int Id { get; set; }
    public string? Comment { get; set; }
    public UserDTO Wanting { get; set; }
    public bool? IsLike { get; set; } 
}