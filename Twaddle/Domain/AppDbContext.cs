using Microsoft.EntityFrameworkCore;
using Twaddle.Domain.Models;

namespace Twaddle.Domain;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Match> Matches { get; set; }
}