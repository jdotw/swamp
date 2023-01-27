using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Org.Entities;

namespace Org.Repository;

public class OrgDbContext : DbContextBase
{
  public DbSet<FunctionType> FunctionTypes => Set<FunctionType>();

  public DbSet<Level> Levels => Set<Level>();
  public DbSet<LevelAssignment> LevelAssignments => Set<LevelAssignment>();

  public DbSet<Role> Roles => Set<Role>();
  public DbSet<RoleAssignment> RoleAssignments => Set<RoleAssignment>();
  public DbSet<RoleType> RoleTypes => Set<RoleType>();

  public DbSet<Unit> Units => Set<Unit>();
  public DbSet<Chapter> Chapters => Set<Chapter>();
  public DbSet<Practice> Practices => Set<Practice>();
  public DbSet<Squad> Squads => Set<Squad>();
  public DbSet<Team> Teams => Set<Team>();
  public DbSet<Tribe> Tribes => Set<Tribe>();

  public DbSet<UnitAssignment> UnitAssignments => Set<UnitAssignment>();
  public DbSet<PracticeAssignment> PracticeAssignments => Set<PracticeAssignment>();
  public DbSet<TribeAssignment> TribeAssignments => Set<TribeAssignment>();
  public DbSet<SquadAssignment> SquadAssignments => Set<SquadAssignment>();
  public DbSet<TeamAssignment> TeamAssignments => Set<TeamAssignment>();
  public DbSet<ChapterAssignment> ChapterAssignments => Set<ChapterAssignment>();

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

    modelBuilder.Entity<Unit>()
        .HasDiscriminator(u => u.UnitType)
        .HasValue<Practice>("practice")
        .HasValue<Chapter>("chapter")
        .HasValue<Tribe>("tribe")
        .HasValue<Squad>("squad")
        .HasValue<Team>("team");
  }
}