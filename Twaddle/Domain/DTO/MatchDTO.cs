using Twaddle.Domain.Models;

namespace Twaddle.Domain.DTO;

public class MatchDTO
{
    public int Id { get; set; }
    public List<Message>? Messages { get; set; }
    public bool IsMutually { get; set; } = false;
    public User Pair { get; set; }
}