using Twaddle.Domain.Models;

namespace Twaddle.Domain.DTO;

public class NewsDTO
{
    public User Creator { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public List<string> Fans { get; set; }
}