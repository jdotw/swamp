using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Base.Repository;
using Base.Entities;

namespace Base.Repository;

public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : EntityBase
{
  private readonly DbContext _context;

  public RepositoryBase(DbContext repositoryContext)
  {
    _context = repositoryContext;
  }

  public IQueryable<TEntity> FindAllAsync()
  {
    return _context.Set<TEntity>().AsNoTracking();
  }

  public virtual IQueryable<TEntity> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
  {
    return _context.Set<TEntity>().Where(expression);
  }

  public virtual async Task<TEntity?> FindById(int id)
  {
    return await FindByConditionAsync(i => i.Id.Equals(id))
      .AsNoTracking()
      .FirstOrDefaultAsync();
  }

  public virtual async Task AddAsync(TEntity obj)
  {
    await _context.Set<TEntity>().AddAsync(obj);
  }

  public virtual void Update(TEntity obj)
  {
    _context.Set<TEntity>().Update(obj);
  }

  public virtual void Delete(object id)
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