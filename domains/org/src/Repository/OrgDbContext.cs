using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Org.Entities;

namespace Org.Repository;

public class OrgDbContext : DbContextBase
{
  public DbSet<Level> Levels => Set<Level>();
  public DbSet<LevelAssignment> LevelAssignments => Set<LevelAssignment>();

  public DbSet<Role> Roles => Set<Role>();
  public DbSet<RoleAssignment> RoleAssignments => Set<RoleAssignment>();
  public DbSet<RoleType> RoleTypes => Set<RoleType>();

  public DbSet<Team> Teams => Set<Team>();

  public DbSet<Person> Persons => Set<Person>();

  public OrgDbContext(DbContextOptions options) : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<RoleType>()
      .HasMany(rt => rt.Children)
      .WithOne(rt => rt.Parent)
      .HasForeignKey(rt => rt.ParentId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
