using Microsoft.EntityFrameworkCore;
using Twaddle.Domain.Models;

namespace Twaddle.Domain;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        
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
    public DbSet<Like> Likes { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
}