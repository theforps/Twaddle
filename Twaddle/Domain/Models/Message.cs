using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Message
{
    [Key]
    public int Id { get; set; }
    public required string Content { get; set; }
    public required User Sender { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public bool Viewed { get; set; } = false;
}