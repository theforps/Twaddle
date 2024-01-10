namespace Twaddle.Domain.DTO;

public class MessageDTO
{
    public string Content { get; set; }
    public string Login { get; set; }
    public bool IsSender { get; set; }
    public DateTime CreatedTime { get; set; }
    public bool Viewed { get; set; } = false;
}