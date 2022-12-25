using People.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace People.PostgreSQL
{
  public class PeopleDbContext : DbContextBase
  {
    public DbSet<Individual> Individuals => Set<Individual>();
    public DbSet<Identity> Identities => Set<Identity>();
    public DbSet<LineManager> LineManagers => Set<LineManager>();

    public PeopleDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<LineManager>()
      .HasOne<Individual>(m => m.Individual)
      .WithMany(i => i.LineManagers)
      .HasForeignKey(m => m.IndividualId);
      modelBuilder.Entity<LineManager>()
      .HasOne<Individual>(m => m.Manager)
      .WithMany(i => i.DirectReports)
      .HasForeignKey(m => m.ManagerId);
    }
  }
}
