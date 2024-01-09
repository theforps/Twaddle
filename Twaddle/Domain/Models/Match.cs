using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Match
{
    [Key]
    public int Id { get; set; }
    public List<Message>? Messages { get; set; }
    public bool IsMutually { get; set; } = false;
    public required List<User> Couple { get; set; }
    
    
}