namespace People.DTOs;

public class LineManagerDto
{
  public int Id { get; set; }
  public int IndividualId { get; set; }
  public int ManagerId { get; set; }
  public DateTimeOffset StartDate { get; set; }
  public DateTimeOffset EndDate { get; set; }
}

public class MutateLineManagerDto
{
  public DateTimeOffset? EndDate { get; set; }
}

public class AddLineManagerDto
{
  public required int ManagerId { get; set; }
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? EndDate { get; set; }
}

