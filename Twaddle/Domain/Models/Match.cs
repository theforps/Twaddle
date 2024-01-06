using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Match
{
    [Key]
    public int Id { get; set; }
    public required User SearchUser { get; set; }
    public User? ResultUser { get; set; }
    public List<Message>? Messages { get; set; }
}