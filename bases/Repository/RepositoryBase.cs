using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Base.Entities;

namespace Base.Repository;

public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : EntityBase
{
  public readonly DbContext Context;

  public RepositoryBase(DbContext repositoryContext)
  {
    Context = repositoryContext;
  }

  public IQueryable<TEntity> FindAllAsync()
  {
    return Context.Set<TEntity>().AsNoTracking();
  }

  public virtual IQueryable<TEntity> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
  {
    return Context.Set<TEntity>().Where(expression);
  }

  public virtual async Task<TEntity?> FindById(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public virtual async Task AddAsync(TEntity obj)
  {
    await Context.Set<TEntity>().AddAsync(obj);
  }

  public virtual void Update(TEntity obj)
  {
    Context.Set<TEntity>().Update(obj);
  }

  public virtual void Delete(object id)
  {
    var entity = Context.Set<TEntity>().Find(id);
    if (entity is not null)
    {
      Context.Set<TEntity>().Remove(entity);
    }
  }

  public async Task<int> SaveAsync()
  {
    return await Context.SaveChangesAsync();
  }
}
