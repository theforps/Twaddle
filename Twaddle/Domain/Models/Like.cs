namespace Twaddle.Domain.Models;

public class Like
{
    public int Id { get; set; }
    public string Liker { get; set; }
    public string Liked { get; set; }
    public DateTime DateOfLike { get; set; } = DateTime.Now;
}