using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Base.Entities;

namespace Base.Repository
{
  public abstract class DbContextBase : DbContext
  {
    public DbContextBase(DbContextOptions options) : base(options)
    {
      ChangeTracker.Tracked += UpdateTimestamps;
      ChangeTracker.StateChanged += UpdateTimestamps;
    }

    private static void UpdateTimestamps(object? sender, EntityEntryEventArgs e)
    {
      if (e.Entry.Entity is EntityBase entityWithTimestamps)
      {
        switch (e.Entry.State)
        {
          case EntityState.Modified:
            entityWithTimestamps.UpdatedDate = DateTime.UtcNow;
            break;
          case EntityState.Added:
            entityWithTimestamps.CreatedDate = DateTime.UtcNow;
            break;
        }
      }
    }

  }
}