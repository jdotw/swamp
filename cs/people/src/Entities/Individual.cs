using Base.Entities;

namespace People.Entities;

public class Individual : EntityBase
{
  public string? ExternalId { get; set; }

  public List<Identity> Identities { get; set; } = new();

  // LineManagers is the list of line management records for 
  // this individual where the latest ID is the current line manager
  public List<LineManager> LineManagers { get; set; } = new();

  // DirectReports is the line management records that reference
  // this individual as the line manager
  public List<LineManager> DirectReports { get; set; } = new();

  public Individual()
  {
  }
}