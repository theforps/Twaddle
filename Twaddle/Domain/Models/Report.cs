using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Report
{
    [Key]
    public int Id { get; set; }
    public User Culprit { get; set; }
    public string Content { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}