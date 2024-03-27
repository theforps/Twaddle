using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Feedback
{
    [Key]
    public int Id { get; set; }
    public string? Comment { get; set; }
    public User Wanting { get; set; }
    public bool? IsLike { get; set; } = false;
}