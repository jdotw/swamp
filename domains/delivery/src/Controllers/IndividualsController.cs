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
[Route("/individuals/{individualId}")]
public class IndividualsController : ControllerBase
{
  private readonly ITribeRoleRepository _tribeRoleRepository;
  private readonly IMapper _mapper;
  private readonly ILogger<TribeRolesController> _logger;
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly JsonSerializerOptions _jsonSerializerOptions;

  public IndividualsController(ITribeRoleRepository tribeRoleRepository, IMapper mapper, ILogger<TribeRolesController> logger, IHttpClientFactory httpClientFactory, IOptions<JsonOptions> jsonOptions)
  {
    _tribeRoleRepository = tribeRoleRepository;
    _mapper = mapper;
    _logger = logger;
    _httpClientFactory = httpClientFactory;
    _jsonSerializerOptions = jsonOptions.Value.JsonSerializerOptions;
  }

  // GET: /individuals/1/triberoles
  [HttpGet("triberoles")]
  public async Task<IActionResult> GetTribeRoles(int individualId)
  {
    var roles = await _tribeRoleRepository.GetAllByIndividualIdAsync(individualId);
    var rolesDto = _mapper.Map<IEnumerable<TribeRoleDto>>(roles);
    return Ok(rolesDto);
  }
}