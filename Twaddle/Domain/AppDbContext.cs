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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Match>()
            .HasMany(e => e.Couple)
            .WithMany(e => e.Matches)
            .UsingEntity<MatchUser>();
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Match> Matches { get; set; }
}