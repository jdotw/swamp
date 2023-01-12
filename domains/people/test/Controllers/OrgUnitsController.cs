using JorgeSerrano.Json;
using People.DTOs;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using People.Repository;
using People.Controllers;
using People.Entities;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Base.UnitTests;

namespace people_service_tests;

public class OrgUnitsControllerTests : ControllerUnitTestBase<OrgUnitsController, IOrgUnitRepository>
{
  private readonly OrgUnitsController _controller;

  private readonly OrgUnit _orgUnit;
  private readonly OrgUnitDto _orgUnitDto;
  private readonly MutateOrgUnitDto _mutateOrgUnitDto;

  public OrgUnitsControllerTests() : base()
  {
    _controller = new OrgUnitsController(_mockLogger.Object, _mockRepository.Object, _mockMapper.Object);

    _orgUnit = new OrgUnit() { Id = 1, Name = "Test" };
    _orgUnitDto = new OrgUnitDto() { Id = _orgUnit.Id, Name = _orgUnit.Name };
    _mutateOrgUnitDto = new MutateOrgUnitDto() { Name = "Updated Org Unit" };

    _mockMapper.Setup(x => x.Map<IEnumerable<OrgUnitDto>>(It.IsAny<List<OrgUnit>>()))
        .Returns(new List<OrgUnitDto> { _orgUnitDto });
    _mockMapper.Setup(x => x.Map<OrgUnitDto>(It.IsAny<OrgUnit>()))
        .Returns(_orgUnitDto);
    _mockMapper.Setup(x => x.Map<OrgUnit>(It.IsAny<MutateOrgUnitDto>()))
        .Returns(_orgUnit);

    _mockRepository.Setup(x => x.GetAllOrgUnitsAsync(It.IsAny<List<int>>()))
        .ReturnsAsync(new List<OrgUnit> { _orgUnit });
  }

  [Fact]
  public async Task GetAll_ReturnsListOfOrgUnits()
  {
    var result = await _controller.GetAll().ContinueWith(t => t.Result as OkObjectResult);
    Assert.Equal(new List<OrgUnitDto> { _orgUnitDto }, result!.Value);
    _mockMapper.Verify(x => x.Map<IEnumerable<OrgUnitDto>>(It.IsAny<List<OrgUnit>>()), Times.Once);
    _mockRepository.Verify(x => x.GetAllOrgUnitsAsync(It.IsAny<List<int>>()), Times.Once);
  }

  [Fact]
  public async Task GetAll_CanFilterByAListOfIds()
  {
    var ids = new List<int> { 1, 2, 3 };
    var result = await _controller.GetAll(ids).ContinueWith(t => t.Result as OkObjectResult);
    Assert.Equal(new List<OrgUnitDto> { _orgUnitDto }, result!.Value);
    _mockMapper.Verify(x => x.Map<IEnumerable<OrgUnitDto>>(It.IsAny<List<OrgUnit>>()), Times.Once);
    _mockRepository.Verify(x => x.GetAllOrgUnitsAsync(ids), Times.Once);
  }

  [Fact]
  public async Task Get_ReturnsOrgUnit()
  {
    _mockRepository.Setup(x => x.GetOrgUnitWithDetailsAsync(It.IsAny<int>()))
        .ReturnsAsync(_orgUnit);
    var result = await _controller.Get(1).ContinueWith(t => t.Result as OkObjectResult);
    Assert.Equal(_orgUnitDto, result!.Value);
    _mockMapper.Verify(x => x.Map<OrgUnitDto>(_orgUnit), Times.Once);
    _mockRepository.Verify(x => x.GetOrgUnitWithDetailsAsync(1), Times.Once);
  }

  [Fact]
  public async Task Create_ReturnsCreatedOrgUnit()
  {
    _mockRepository.Setup(x => x.AddOrgUnitAsync(It.IsAny<OrgUnit>()))
        .ReturnsAsync(1);
    var result = await _controller.Create(_mutateOrgUnitDto).ContinueWith(t => t.Result as CreatedAtActionResult);
    Assert.Equal(_orgUnitDto, result!.Value);
    _mockRepository.Verify(x => x.AddOrgUnitAsync(_orgUnit), Times.Once);
    _mockMapper.Verify(x => x.Map<OrgUnitDto>(_orgUnit), Times.Once);
  }

  [Fact]
  public async Task Update_OnSuccess_ReturnsNoContentStatus()
  {
    _mockRepository.Setup(x => x.UpdateOrgUnitAsync(It.IsAny<OrgUnit>()))
        .ReturnsAsync(1);
    var result = await _controller.Update(1, _mutateOrgUnitDto).ContinueWith(t => t.Result as NoContentResult);
    Assert.Equal(204, result!.StatusCode);
    _mockMapper.Verify(x => x.Map<OrgUnit>(_mutateOrgUnitDto), Times.Once);
    _mockRepository.Verify(x => x.UpdateOrgUnitAsync(_orgUnit), Times.Once);
  }

  [Fact]
  public async Task Update_OnFailure_ReturnsNotFoundStatus()
  {
    _mockRepository.Setup(x => x.UpdateOrgUnitAsync(It.IsAny<OrgUnit>()))
        .ReturnsAsync(0);
    var result = await _controller.Update(1, _mutateOrgUnitDto).ContinueWith(t => t.Result as NotFoundResult);
    Assert.Equal(404, result!.StatusCode);
    _mockMapper.Verify(x => x.Map<OrgUnit>(_mutateOrgUnitDto), Times.Once);
    _mockRepository.Verify(x => x.UpdateOrgUnitAsync(_orgUnit), Times.Once);
  }

  [Fact]
  public async Task Delete_OnSuccess_ReturnsNoContentStatus()
  {
    _mockRepository.Setup(x => x.DeleteOrgUnitAsync(It.IsAny<int>()))
        .ReturnsAsync(1);
    var result = await _controller.Delete(1).ContinueWith(t => t.Result as NoContentResult);
    Assert.Equal(204, result!.StatusCode);
    _mockRepository.Verify(x => x.DeleteOrgUnitAsync(_orgUnit.Id), Times.Once);
  }

  [Fact]
  public async Task Delete_OnFailure_ReturnsNotFoundStatus()
  {
    _mockRepository.Setup(x => x.DeleteOrgUnitAsync(It.IsAny<int>()))
        .ReturnsAsync(0);
    var result = await _controller.Delete(1).ContinueWith(t => t.Result as NotFoundResult);
    Assert.IsType<NotFoundResult>(result);
    _mockRepository.Verify(x => x.DeleteOrgUnitAsync(_orgUnit.Id), Times.Once);
  }
}