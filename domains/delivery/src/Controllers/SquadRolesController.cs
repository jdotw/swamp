using System.Text.Json;
using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Delivery.Controllers;

[ApiController]
[Route("/tribes/{tribeId}/squads/{squadId}/roles")]
public class SquadRolesController : ControllerBase
{
  private readonly ISquadRoleRepository _repository;
  private readonly IMapper _mapper;
  private readonly ILogger<SquadRolesController> _logger;
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly JsonSerializerOptions _jsonSerializerOptions;

  public SquadRolesController(ISquadRoleRepository repository, IMapper mapper, ILogger<SquadRolesController> logger, IHttpClientFactory httpClientFactory, IOptions<JsonOptions> jsonOptions)
  {
    _repository = repository;
    _mapper = mapper;
    _logger = logger;
    _httpClientFactory = httpClientFactory;
    _jsonSerializerOptions = jsonOptions.Value.JsonSerializerOptions;
  }

  // GET: /tribes/1/squads/2/roles
  [HttpGet]
  public async Task<IActionResult> GetAll(int squadId)
  {
    var roles = await _repository.GetAllAsync(squadId);
    var rolesDto = _mapper.Map<IEnumerable<SquadRoleDto>>(roles);
    var individualIds = rolesDto.Select(r => r.IndividualId).Distinct();
    var individualsById = await GetIndividuals(individualIds.ToList());
    foreach (var role in rolesDto)
    {
      role.Individual = individualsById[role.IndividualId];
    }
    return Ok(rolesDto);
  }

  private async Task<Dictionary<int, SquadRoleDtoIndividual>> GetIndividuals(List<int> ids)
  {
    var httpClient = _httpClientFactory.CreateClient();
    var queryString = string.Join("&", ids.Select(id => $"id={id}"));
    var individuals = await httpClient.GetFromJsonAsync<List<SquadRoleDtoIndividual>>($"http://localhost:5187/individuals?{queryString}", _jsonSerializerOptions);
    return (individuals ?? new()).ToDictionary(i => i.Id);
  }

  // GET: /tribes/1/squads/2/roles/3
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var role = await GetRoleWithIndividual(id);
    if (role is null) return NotFound();
    return Ok(role);
  }

  private async Task<SquadRoleDto?> GetRoleWithIndividual(int id)
  {
    var role = await _repository.GetDetailsAsync(id);
    if (role is null) return null;
    var roleDto = _mapper.Map<SquadRoleDto>(role);
    roleDto.Individual = await GetIndividuals(new() { role.IndividualId }).ContinueWith(t => t.Result[role.IndividualId]);
    return roleDto;
  }

  // POST: /tribes/1/squads/2/roles
  [HttpPost]
  public async Task<IActionResult> Create(int squadId, AddSquadRoleDto roleDto)
  {
    var role = _mapper.Map<SquadRole>(roleDto);
    role.SquadId = squadId;
    _logger.LogInformation("Creating role with squadId {squadId}", squadId);
    var result = await _repository.AddAsync(role);
    if (result <= 0) return BadRequest();
    var roleWithIndividual = await GetRoleWithIndividual(role.Id);
    return CreatedAtAction(nameof(Create), new { id = role.Id }, roleWithIndividual);
  }

  // PUT: /tribes/1/squads/2/roles/3
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateSquadRoleDto roleDto)
  {
    var role = _mapper.Map<SquadRole>(roleDto);
    role.Id = id;
    var updated = await _repository.UpdateAsync(role);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/1/squads/2/roles/3
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}