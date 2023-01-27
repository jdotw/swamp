using Org.Entities;
using Microsoft.EntityFrameworkCore;
using Base.Repository;

namespace Org.Repository;

public abstract class UnitRepository<TUnit> : RepositoryBase<TUnit>
  where TUnit : Unit
{
  public UnitRepository(OrgDbContext repositoryContext)
      : base(repositoryContext)
  {

  }

  public virtual void UpdateFields(Unit update, Unit existing)
  {
    existing.Name = update.Name;
    existing.Description = update.Description;
    existing.DisbandedDate = update.DisbandedDate;
  }
}