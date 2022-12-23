using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace People.DTOs;

public class LineManagerDto
{
  [JsonPropertyName("id")]
  public int Id { get; set; }
  [JsonPropertyName("individual_id")]
  public int IndividualId { get; set; }
  [JsonPropertyName("manager_id")]
  public int ManagerId { get; set; }
  [JsonPropertyName("start_date")]
  public DateTimeOffset StartDate { get; set; }
  [JsonPropertyName("end_date")]
  public DateTimeOffset EndDate { get; set; }
}

public class MutateLineManagerDto
{
  [JsonPropertyName("end_date")]
  public DateTimeOffset? EndDate { get; set; }
}

public class AddLineManagerDto
{
  [JsonPropertyName("manager_id")]
  public required int ManagerId { get; set; }
  [JsonPropertyName("start_date")]
  public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
  [JsonPropertyName("end_date")]
  public DateTimeOffset? EndDate { get; set; }
}

