namespace Base.Entities;

public abstract class EntityBase
{
  public int Id { get; set; }
  public DateTimeOffset CreatedDate { get; set; }
  public DateTimeOffset UpdatedDate { get; set; }
}