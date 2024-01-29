namespace Twaddle.Domain.Models;

public class Like
{
    public int Id { get; set; }
    public User Liker { get; set; }
    public User Liked { get; set; }
    public DateTime DateOfLike { get; set; } = DateTime.Now;
}