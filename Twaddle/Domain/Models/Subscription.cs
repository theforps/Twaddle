using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Subscription
{
    [Key]
    public int Id { get; set; }
    public User Client { get; set; }
    public DateTime StartTime { get; set; } = DateTime.Now;
    public DateTime EndTime { get; set; }
}