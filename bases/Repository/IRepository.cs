using System.Linq.Expressions;

namespace Base.Repository;

public interface IRepository<TEntity> where TEntity : class
{
  IQueryable<TEntity> FindAllAsync();
  IQueryable<TEntity> FindByConditionAsync(Expression<Func<TEntity, bool>> expression);
  Task AddAsync(TEntity obj);
  void Update(TEntity obj);
  void Delete(object id);
  Task<int> SaveAsync();
}