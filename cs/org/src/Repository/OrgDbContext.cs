using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Base.Entities;
using Org.Entities;

namespace Org.Repository;

public class OrgDbContext : DbContextBase
{
  public DbSet<Level> Levels => Set<Level>();

  public DbSet<Role> Roles => Set<Role>();
  public DbSet<RoleAssignment> RoleAssignments => Set<RoleAssignment>();
  public DbSet<RoleType> RoleTypes => Set<RoleType>();

  public DbSet<Team> Teams => Set<Team>();

  public DbSet<Person> Persons => Set<Person>();

  public DbSet<DeploymentType> DeploymentTypes => Set<DeploymentType>();
  public DbSet<CapabilityType> CapabilityTypes => Set<CapabilityType>();

  public DbSet<Capability> Capabilities => Set<Capability>();

  public DbSet<HomeAssignment> HomeAssignments => Set<HomeAssignment>();
  public DbSet<ManagerAssignment> ManagerAssignments => Set<ManagerAssignment>();

  public DbSet<Deployment> Deployments => Set<Deployment>();

  public DbSet<Track> Tracks => Set<Track>();

  public DbSet<Title> Titles => Set<Title>();
  public DbSet<TitleAssignment> TitleAssignments => Set<TitleAssignment>();

  public OrgDbContext(DbContextOptions options) : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<ManagerAssignment>().HasOne(p => p.Role).WithMany(p => p.ManagerAssignments).HasForeignKey(p => p.RoleId).OnDelete(DeleteBehavior.Restrict);
    modelBuilder.Entity<RoleType>().HasMany(p => p.Children).WithOne(p => p.Parent).HasForeignKey(p => p.ParentId).OnDelete(DeleteBehavior.Cascade);
    modelBuilder.Entity<ParameterBase>().UseTpcMappingStrategy();
  }
}
