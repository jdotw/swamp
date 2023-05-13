using System.Text.Json;
using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Capability.Controllers;

[ApiController]
[Route("/practices/{practiceId}/roles")]
public class PracticeRolesController : ControllerBase
{
  private readonly IPracticeRoleRepository _repository;
  private readonly IMapper _mapper;
  private readonly ILogger<PracticeRolesController> _logger;
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly JsonSerializerOptions _jsonSerializerOptions;

  public PracticeRolesController(IPracticeRoleRepository repository, IMapper mapper, ILogger<PracticeRolesController> logger, IHttpClientFactory httpClientFactory, IOptions<JsonOptions> jsonOptions)
  {
    _repository = repository;
    _mapper = mapper;
    _logger = logger;
    _httpClientFactory = httpClientFactory;
    _jsonSerializerOptions = jsonOptions.Value.JsonSerializerOptions;
  }

  // GET: /practices/1/roles
  [HttpGet]
  public async Task<IActionResult> GetAll(int practiceId)
  {
    var roles = await _repository.GetAllAsync(practiceId);
    var rolesDto = _mapper.Map<IEnumerable<PracticeRoleDto>>(roles);
    var individualIds = rolesDto.Select(r => r.IndividualId).Distinct();
    var individualsById = await GetIndividuals(individualIds.ToList());
    foreach (var role in rolesDto)
    {
      role.Individual = individualsById[role.IndividualId];
    }
    return Ok(rolesDto);
  }

  private async Task<Dictionary<int, PracticeRoleDtoIndividual>> GetIndividuals(List<int> ids)
  {
    var httpClient = _httpClientFactory.CreateClient();
    var queryString = string.Join("&", ids.Select(id => $"id={id}"));
    var individuals = await httpClient.GetFromJsonAsync<List<PracticeRoleDtoIndividual>>($"http://localhost:5187/individuals?{queryString}", _jsonSerializerOptions);
    return (individuals ?? new()).ToDictionary(i => i.Id);
  }

  // GET: /practices/1/roles/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int practiceId, int id)
  {
    var role = await GetRoleWithIndividual(practiceId, id);
    if (role is null) return NotFound();
    return Ok(role);
  }

  private async Task<PracticeRoleDto?> GetRoleWithIndividual(int practiceId, int id)
  {
    var role = await _repository.GetDetailsAsync(id);
    if (role is null) return null;
    var roleDto = _mapper.Map<PracticeRoleDto>(role);
    roleDto.Individual = await GetIndividuals(new() { role.IndividualId }).ContinueWith(t => t.Result[role.IndividualId]);
    return roleDto;
  }

  // POST: /practices/1/roles
  [HttpPost]
  public async Task<IActionResult> Create(int practiceId, AddPracticeRoleDto roleDto)
  {
    var role = _mapper.Map<PracticeRole>(roleDto);
    role.PracticeId = practiceId;
    var result = await _repository.AddAsync(role);
    if (result <= 0) return BadRequest();
    var roleWithIndividual = await GetRoleWithIndividual(practiceId, role.Id);
    return CreatedAtAction(nameof(Create), new { id = role.Id }, roleWithIndividual);
  }

  // PUT: /practices/1/roles/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdatePracticeRoleDto roleDto)
  {
    var role = _mapper.Map<PracticeRole>(roleDto);
    role.Id = id;
    var updated = await _repository.UpdateAsync(role);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /practices/1/roles/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}