using Delivery.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Delivery.Repository
{
  public class DeliveryDbContext : DbContextBase
  {
    public DbSet<Squad> Squads => Set<Squad>();
    public DbSet<SquadRoleType> SquadRoleTypes => Set<SquadRoleType>();
    public DbSet<SquadRole> SquadRoles => Set<SquadRole>();
    public DbSet<Tribe> Tribes => Set<Tribe>();
    public DbSet<TribeRoleType> TribeRoleTypes => Set<TribeRoleType>();
    public DbSet<TribeRole> TribeRoles => Set<TribeRole>();

    public DeliveryDbContext(DbContextOptions options) : base(options)
    {

    }
  }
}