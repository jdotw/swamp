using JorgeSerrano.Json;
using People.DTOs;
using System.Text.Json;

namespace people_service_tests;

public class CreateIndividualDtoRequiredFields
{
  const string jsonPath = "../../../DTOs/json/";

  private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
  {
    PropertyNamingPolicy = new JsonSnakeCaseNamingPolicy(),
  };

  string JsonPath(string filename)
  {
    return jsonPath + filename;
  }

  void AssertIndividualDtoRequiredField(string jsonFilePath, string attribute)
  {
    var path = Path.IsPathRooted(jsonFilePath)
        ? jsonFilePath
        : Path.GetRelativePath(Directory.GetCurrentDirectory(), jsonFilePath);
    if (!File.Exists(path))
    {
      throw new ArgumentException($"Could not find file at path: {path}");
    }
    var fileData = File.ReadAllText(jsonFilePath);
    var ex = Assert.Throws<System.Text.Json.JsonException>(() => JsonSerializer.Deserialize<CreateIndividualDto>(fileData, _jsonOptions));
    Assert.Contains("missing required properties", ex.Message);
    Assert.Contains(attribute, ex.Message);
  }

  [Fact]
  public void AddIndividualDtoRequiredFields()
  {
    AssertIndividualDtoRequiredField(JsonPath("mutate_individual_missing_external_id.json"), "external_id");
    AssertIndividualDtoRequiredField(JsonPath("mutate_individual_missing_first_name.json"), "first_name");
    AssertIndividualDtoRequiredField(JsonPath("mutate_individual_missing_last_name.json"), "last_name");
  }


  [Fact]
  public void MutateIndividualDtoOptionalFields()
  {
    var jsonFilePath = JsonPath("mutate_individual_required_fields.json");
    var path = Path.IsPathRooted(jsonFilePath)
         ? jsonFilePath
         : Path.GetRelativePath(Directory.GetCurrentDirectory(), jsonFilePath);
    if (!File.Exists(path))
    {
      throw new ArgumentException($"Could not find file at path: {path}");
    }
    var fileData = File.ReadAllText(jsonFilePath);
    JsonSerializer.Deserialize<CreateIndividualDto>(fileData, _jsonOptions);
  }
}