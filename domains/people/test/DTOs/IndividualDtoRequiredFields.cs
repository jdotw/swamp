using JorgeSerrano.Json;
using People.DTOs;
using System.Text.Json;

namespace people_service_tests;

public class UnitTest1
{
  const string jsonPath = "../../../DTOs/json/";

  string JsonPath(string filename)
  {
    return jsonPath + filename;
  }

  void AssetIndividualDtoRequiredField(string jsonFilePath, string attribute)
  {
    var path = Path.IsPathRooted(jsonFilePath)
        ? jsonFilePath
        : Path.GetRelativePath(Directory.GetCurrentDirectory(), jsonFilePath);
    if (!File.Exists(path))
    {
      throw new ArgumentException($"Could not find file at path: {path}");
    }
    var fileData = File.ReadAllText(jsonFilePath);
    var ex = Assert.Throws<System.Text.Json.JsonException>(() => JsonSerializer.Deserialize<MutateIndividualDto>(fileData, _jsonOptions));
    Assert.Contains("missing required properties", ex.Message);
    Assert.Contains(attribute, ex.Message);
  }

  [Fact]
  public void MutateIndividualDtoRequiredFields()
  {
    AssetIndividualDtoRequiredField(JsonPath("mutate_individual_missing_external_id.json"), "external_id");
    AssetIndividualDtoRequiredField(JsonPath("mutate_individual_missing_first_name.json"), "first_name");
    AssetIndividualDtoRequiredField(JsonPath("mutate_individual_missing_last_name.json"), "last_name");
  }

  private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
  {
    PropertyNamingPolicy = new JsonSnakeCaseNamingPolicy(),
  };

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
    JsonSerializer.Deserialize<MutateIndividualDto>(fileData, _jsonOptions);
  }
}