using System.Linq.Expressions;
using Delivery.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Repository;

public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
{
  private readonly DeliveryContext _context;

  public RepositoryBase(DeliveryContext repositoryContext)
  {
    _context = repositoryContext;
  }

  public IQueryable<TEntity> FindAllAsync()
  {
    return _context.Set<TEntity>().AsNoTracking();
  }

  public IQueryable<TEntity> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
  {
    return _context.Set<TEntity>().Where(expression);
  }


  public async Task AddAsync(TEntity obj)
  {
    await _context.Set<TEntity>().AddAsync(obj);
  }

  public void Update(TEntity obj)
  {
    _context.Set<TEntity>().Update(obj);
  }

  public void Delete(object id)
  {
    var entity = _context.Set<TEntity>().Find(id);
    if (entity is not null)
    {
      _context.Set<TEntity>().Remove(entity);
    }
  }

  public async Task<int> SaveAsync()
  {
    return await _context.SaveChangesAsync();
  }
}