using System.Linq.Expressions;
using Delivery.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Repository;

public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
{
  private readonly DeliveryContext RepositoryContext;

  public RepositoryBase(DeliveryContext repositoryContext)
  {
    RepositoryContext = repositoryContext;
  }

  public IQueryable<TEntity> FindAllAsync()
  {
    return RepositoryContext.Set<TEntity>().AsNoTracking();
  }

  public IQueryable<TEntity> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
  {
    return RepositoryContext.Set<TEntity>().Where(expression);
  }


  public async Task AddAsync(TEntity obj)
  {
    await RepositoryContext.Set<TEntity>().AddAsync(obj);
  }

  public void Update(TEntity obj)
  {
    RepositoryContext.Set<TEntity>().Update(obj);
  }

  public void Delete(object id)
  {
    var entity = RepositoryContext.Set<TEntity>().Find(id);
    if (entity is not null)
    {
      RepositoryContext.Set<TEntity>().Remove(entity);
    }
  }

  public async Task<int> SaveAsync()
  {
    return await RepositoryContext.SaveChangesAsync();
  }
}