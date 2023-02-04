namespace Org.DTOs;

public class FunctionTypeDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public Boolean IsIndividualContributor { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public List<UnitAssignmentDto> UnitAssignments { get; set; } = new();
}

public class FunctionTypeCollectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public Boolean IsIndividualContributor { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateFunctionTypeDto
{
  public required string Name { get; set; } = null!;
  public Boolean IsIndividualContributor { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class UpdateFunctionTypeDto
{
  public required string Name { get; set; } = null!;
  public Boolean IsIndividualContributor { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}