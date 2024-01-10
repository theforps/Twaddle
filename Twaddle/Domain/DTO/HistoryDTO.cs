namespace Twaddle.Domain.DTO;

public class HistoryDTO
{
    public int MatchId { get; set; }
    public UserDTO SenderInfo { get; set; }
    public List<MessageDTO> Messages { get; set; }
}