using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Delivery.Repository
{
  public class DeliveryContext : DbContext
  {
    public DbSet<Squad> Squads => Set<Squad>();
    public DbSet<SquadRoleType> SquadRoleTypes => Set<SquadRoleType>();
    public DbSet<SquadRole> SquadRoles => Set<SquadRole>();
    public DbSet<Tribe> Tribes => Set<Tribe>();
    public DbSet<TribeRoleType> TribeRoleTypes => Set<TribeRoleType>();
    public DbSet<TribeRole> TribeRoles => Set<TribeRole>();

    public DeliveryContext(DbContextOptions options) : base(options)
    {
      ChangeTracker.Tracked += UpdateTimestamps;
      ChangeTracker.StateChanged += UpdateTimestamps;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

    private static void UpdateTimestamps(object? sender, EntityEntryEventArgs e)
    {
      if (e.Entry.Entity is BaseEntity entityWithTimestamps)
      {
        switch (e.Entry.State)
        {
          case EntityState.Modified:
            entityWithTimestamps.UpdatedDate = DateTime.UtcNow;
            Console.WriteLine($"Stamped for update: {e.Entry.Entity}");
            break;
          case EntityState.Added:
            entityWithTimestamps.CreatedDate = DateTime.UtcNow;
            Console.WriteLine($"Stamped for insert: {e.Entry.Entity}");
            break;
        }
      }
    }

  }
}