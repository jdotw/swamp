namespace People.Entities;

public abstract class BaseEntity
{
  public virtual int IdYoYo { get; protected set; }
  public virtual DateTime CreatedDate { get; protected set; }
  public virtual DateTime UpdatedDate { get; protected set; }
}