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
  [HttpGet]
  public async Task<IActionResult> GetAll(int tribeId)
  {
    var roles = await _repository.GetAllAsync(tribeId);
    var rolesDto = _mapper.Map<IEnumerable<TribeRoleDto>>(roles);
    var individualIds = rolesDto.Select(r => r.IndividualId).Distinct();
    var individualsById = await GetIndividuals(individualIds.ToList());
    foreach (var role in rolesDto)
    {
      role.Individual = individualsById[role.IndividualId];
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
    var role = await _repository.GetDetailsAsync(id);
    if (role is null) return NotFound();
    var roleDto = _mapper.Map<TribeRoleDto>(role);
    return Ok(roleDto);
  }

  // POST: /tribes/1/roles
  [HttpPost]
  public async Task<IActionResult> Create(int tribeId, AddTribeRoleDto roleDto)
  {
    var role = _mapper.Map<TribeRole>(roleDto);
    role.TribeId = tribeId;
    await _repository.AddAsync(role);
    role = await _repository.GetDetailsAsync(role.Id);
    return (role is not null) ? CreatedAtAction(nameof(Create), new { id = role.Id }, _mapper.Map<TribeRoleDto>(role)) : BadRequest();
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