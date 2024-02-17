using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class Order
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public User Creator { get; set; }
    public int StartPrice { get; set; } 
    public int EndProce { get; set; }
    public List<byte[]>? Pictures { get; set; }
}
