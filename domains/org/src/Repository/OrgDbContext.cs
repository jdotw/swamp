using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Org.Entities;

namespace Org.Repository;

public class OrgDbContext : DbContextBase
{
  public DbSet<Person> Persons => Set<Person>();
  public DbSet<Role> Roles => Set<Role>();
  public DbSet<RoleType> RoleTypes => Set<RoleType>();
  public DbSet<Function> Functions => Set<Function>();
  public DbSet<FunctionType> FunctionTypes => Set<FunctionType>();
  public DbSet<Practice> Practices => Set<Practice>();
  public DbSet<Chapter> Chapters => Set<Chapter>();
  public DbSet<Tribe> Tribes => Set<Tribe>();
  public DbSet<Squad> Squads => Set<Squad>();
  public DbSet<Team> Teams => Set<Team>();

  public OrgDbContext(DbContextOptions options) : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    //   modelBuilder.Entity<LineManager>()
    //   .HasOne<Individual>(m => m.Individual)
    //   .WithMany(i => i.LineManagers)
    //   .HasForeignKey(m => m.IndividualId);
    //   modelBuilder.Entity<LineManager>()
    //   .HasOne<Individual>(m => m.Manager)
    //   .WithMany(i => i.DirectReports)
    //   .HasForeignKey(m => m.ManagerId);
  }
}