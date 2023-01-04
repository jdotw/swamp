using System.Collections.Concurrent;
using System.Text.Json;
using AutoMapper;
using Capability.DTOs;
using Capability.Entities;
using JorgeSerrano.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

namespace Capability.Controllers;

[ApiController]
[Route("/individuals/{individualId}")]
public class IndividualsController : ControllerBase
{
  private readonly IPracticeRoleRepository _practiceRoleRepository;
  private readonly IChapterRoleRepository _chapterRoleRepository;
  private readonly IMapper _mapper;
  private readonly ILogger<PracticeRolesController> _logger;
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly JsonSerializerOptions _jsonSerializerOptions;

  public IndividualsController(IPracticeRoleRepository practiceRoleRepository,
                                IChapterRoleRepository chapterRoleRepository,
                                IMapper mapper,
                                ILogger<PracticeRolesController> logger,
                                IHttpClientFactory httpClientFactory,
                                IOptions<JsonOptions> jsonOptions)
  {
    _practiceRoleRepository = practiceRoleRepository;
    _chapterRoleRepository = chapterRoleRepository;
    _mapper = mapper;
    _logger = logger;
    _httpClientFactory = httpClientFactory;
    _jsonSerializerOptions = jsonOptions.Value.JsonSerializerOptions;
  }

  // GET: /individuals/1/practiceroles
  [HttpGet("practiceroles")]
  public async Task<IActionResult> GetPracticeRoles(int individualId)
  {
    var roles = await _practiceRoleRepository.GetAllByIndividualIdAsync(individualId);
    var rolesDto = _mapper.Map<IEnumerable<PracticeRoleDto>>(roles);
    return Ok(rolesDto);
  }

  // GET: /individuals/1/chapterroles
  [HttpGet("chapterroles")]
  public async Task<IActionResult> GetChapterRoles(int individualId)
  {
    var roles = await _chapterRoleRepository.GetAllByIndividualIdAsync(individualId);
    var rolesDto = _mapper.Map<IEnumerable<ChapterRoleDto>>(roles);
    return Ok(rolesDto);
  }

}