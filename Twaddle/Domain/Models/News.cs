using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class News
{
    [Key]
    public int Id { get; set; }
    public User Creator { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public int CountOfMarks { get; set; } = 0;
}