using People.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace People.PostgreSQL
{
  public class PeopleContext : DbContext
  {
    public DbSet<Individual> Individuals => Set<Individual>();
    public DbSet<Identity> Identities => Set<Identity>();

    public PeopleContext(DbContextOptions options) : base(options)
    {
      ChangeTracker.Tracked += UpdateTimestamps;
      ChangeTracker.StateChanged += UpdateTimestamps;
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
