
namespace Base.Entities;

public abstract class AssignmentBase : EntityBase
{
  public EntityBase Assignee { get; set; } = null!;
  public EntityBase Assignment { get; set; } = null!;
}
