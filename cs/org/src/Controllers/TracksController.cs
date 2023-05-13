using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Org.Entities;
using Org.Repository;
using Org.DTOs;
using AutoMapper;

namespace Org.Controllers;

[ApiController]
[Route("/tracks")]
public class TracksController : ControllerBase<Track, ITrackRepository>
{
  public TracksController(ILogger<TracksController> logger, ITrackRepository repository, IMapper mapper)
    : base(logger, repository, mapper)
  {
  }

  // GET: /tracks
  [HttpGet()]
  public async Task<IActionResult> GetAll([FromQuery(Name = "id")] List<int>? ids = null)
  {
    var tracks = await Repository.GetAllAsync(ids);
    var tracksDto = Mapper.Map<IEnumerable<TrackDto>>(tracks);
    return Ok(tracksDto);
  }

  // GET: /tracks/5
  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var track = await Repository.GetWithDetailsAsync(id);
    if (track is null) return NotFound();
    var trackDto = Mapper.Map<TrackDto>(track);
    return Ok(trackDto);
  }

  // POST: /tracks
  [HttpPost]
  public async Task<IActionResult> Create(CreateTrackDto trackDto)
  {
    var track = Mapper.Map<Track>(trackDto);
    await Repository.AddAsync(track);
    return CreatedAtAction(nameof(Get), new { id = track.Id }, Mapper.Map<TrackDto>(track));
  }

  // PUT: /tracks/5
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTrackDto trackDto)
  {
    var track = Mapper.Map<Track>(trackDto);
    track.Id = id;
    var updated = await Repository.UpdateAsync(track);
    return (updated > 0) ? NoContent() : NotFound();
  }

  // DELETE: /tracks/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await Repository.DeleteAsync(id);
    return (deleted > 0) ? NoContent() : NotFound();
  }
}

