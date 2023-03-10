using System.Collections.Concurrent;
using System.Text.Json;
using AutoMapper;
using Delivery.DTOs;
using Delivery.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

namespace Delivery.Controllers;

[ApiController]
[Route("/tribes/{tribeId}/roles")]
public class TribeRolesController : ControllerBase
{
  private readonly ITribeRoleRepository _repository;
  private readonly IMapper _mapper;
  private readonly ILogger<TribeRolesController> _logger;
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly JsonSerializerOptions _jsonSerializerOptions;

  public TribeRolesController(ITribeRoleRepository repository, IMapper mapper, ILogger<TribeRolesController> logger, IHttpClientFactory httpClientFactory, IOptions<JsonOptions> jsonOptions)
  {
    _repository = repository;
    _mapper = mapper;
    _logger = logger;
    _httpClientFactory = httpClientFactory;
    _jsonSerializerOptions = jsonOptions.Value.JsonSerializerOptions;
  }

  // GET: /tribes/1/roles
  // GET: /tribes/1/roles?individual_id=1&individual_id=2
  [HttpGet]
  public async Task<IActionResult> GetAll(int tribeId, [FromQuery(Name = "individual_id")] List<int>? individualIds = null)
  {
    var roles = await _repository.GetAllAsync(tribeId, individualIds);
    var rolesDto = _mapper.Map<IEnumerable<TribeRoleDto>>(roles);
    if (individualIds == null)
    {
      // If individualIds is null, we fetch the individuals
      // that are associated with the roles. The assumption here
      // is that if you're querying for a specific individual,
      // then you likely already have that individiual's details
      // and don't need us to return it here (saves some JOINs)
      var resultsIndividualIds = rolesDto.Select(r => r.IndividualId).Distinct();
      var individualsById = await GetIndividuals(resultsIndividualIds.ToList());
      foreach (var role in rolesDto)
      {
        role.Individual = individualsById[role.IndividualId];
      }
    }

    return Ok(rolesDto);
  }

  private async Task<Dictionary<int, TribeRoleDtoIndividual>> GetIndividuals(List<int> ids)
  {
    var httpClient = _httpClientFactory.CreateClient();
    var queryString = string.Join("&", ids.Select(id => $"id={id}"));
    var individuals = await httpClient.GetFromJsonAsync<List<TribeRoleDtoIndividual>>($"http://localhost:5187/individuals?{queryString}", _jsonSerializerOptions);
    return (individuals ?? new()).ToDictionary(i => i.Id);
  }

  // GET: /tribes/1/roles/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int tribeId, int id)
  {
    var role = await GetRoleWithIndividual(tribeId, id);
    if (role is null) return NotFound();
    return Ok(role);
  }

  private async Task<TribeRoleDto?> GetRoleWithIndividual(int tribeId, int id)
  {
    var role = await _repository.GetDetailsAsync(id);
    if (role is null) return null;
    var roleDto = _mapper.Map<TribeRoleDto>(role);
    roleDto.Individual = await GetIndividuals(new() { role.IndividualId }).ContinueWith(t => t.Result[role.IndividualId]);
    return roleDto;
  }

  // POST: /tribes/1/roles
  [HttpPost]
  public async Task<IActionResult> Create(int tribeId, AddTribeRoleDto roleDto)
  {
    var role = _mapper.Map<TribeRole>(roleDto);
    role.TribeId = tribeId;
    var result = await _repository.AddAsync(role);
    if (result <= 0) return BadRequest();
    var roleWithIndividual = await GetRoleWithIndividual(tribeId, role.Id);
    return CreatedAtAction(nameof(Create), new { id = role.Id }, roleWithIndividual);
  }

  // PUT: /tribes/1/roles/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTribeRoleDto roleDto)
  {
    var role = _mapper.Map<TribeRole>(roleDto);
    role.Id = id;
    var updated = await _repository.UpdateAsync(role);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tribes/1/roles/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}