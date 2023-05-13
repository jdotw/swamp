
namespace Org.DTOs;

public class DeploymentTypeDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
  public int? ParentId { get; set; }
  public DeploymentTypeDto? Parent { get; set; }
  public List<DeploymentTypeCollectionDto> Children { get; set; } = new();
}

public class DeploymentTypeCollectionDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; }
  public DateTimeOffset? RetiredAtDate { get; set; }
}

public class CreateDeploymentTypeDto : UpdateDeploymentTypeDto
{
}

public class UpdateDeploymentTypeDto
{
  public required string Name { get; set; }
  public int? ParentId { get; set; }
  public DateTimeOffset ActiveFromDate { get; set; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? RetiredAtDate { get; set; }
}
