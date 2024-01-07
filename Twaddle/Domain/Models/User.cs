using System.ComponentModel.DataAnnotations;

namespace Twaddle.Domain.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Sex { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Goal { get; set; } = string.Empty;
    public int Age { get; set; } = 0;
    public string Country { get; set; } = string.Empty;
    public string Education { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
    public string Login { get; set; }= string.Empty;
    public string PasswordHash { get; set; }= string.Empty;
    
    public List<Match> Matches { get; set; }
}