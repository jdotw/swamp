namespace People.Entities;

public abstract class BaseEntity
{
  public int Id { get; set; }
  public DateTimeOffset CreatedDate { get; protected set; }
  public DateTimeOffset UpdatedDate { get; protected set; }
}