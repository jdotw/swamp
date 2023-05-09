

namespace Base.Entities;

public abstract class ParameterBase : EntityBase
{
    public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? RetiredAtDate { get; set; }

    public int? ParentId { get; set; }
}

