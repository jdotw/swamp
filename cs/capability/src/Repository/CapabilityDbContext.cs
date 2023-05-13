using Capability.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Capability.Repository
{
  public class CapabilityDbContext : DbContextBase
  {
    public DbSet<Chapter> Chapters => Set<Chapter>();
    public DbSet<ChapterRoleType> ChapterRoleTypes => Set<ChapterRoleType>();
    public DbSet<ChapterRole> ChapterRoles => Set<ChapterRole>();
    public DbSet<Practice> Practices => Set<Practice>();
    public DbSet<PracticeRoleType> PracticeRoleTypes => Set<PracticeRoleType>();
    public DbSet<PracticeRole> PracticeRoles => Set<PracticeRole>();

    public CapabilityDbContext(DbContextOptions options) : base(options)
    {

    }
  }
}