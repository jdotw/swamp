using Moq;
using Org.Repository;
using Org.Entities;
using Microsoft.EntityFrameworkCore;

namespace Org.UnitTests;

public class HomeAssignmentRepositoryTests
{
    private readonly Mock<OrgDbContext> _context;
    private readonly Mock<HomeAssignmentRepository> _repo;

    public HomeAssignmentRepositoryTests()
    {
        _context = new Mock<OrgDbContext>(new DbContextOptions<OrgDbContext>());
        _repo = new Mock<HomeAssignmentRepository>(_context.Object) { CallBase = true, };
    }

    [Fact]
    public void UpdateHomeAssignmentFields_UpdatesExpectedFields()
    {
        var existingHomeAssignment = new HomeAssignment()
        {
            Id = 1,
            TeamId = 1,
            CapabilityId = 1,
            EndDate = null,
        };
        var update = new HomeAssignment()
        {
            Id = existingHomeAssignment.Id,
            TeamId = existingHomeAssignment.TeamId,
            CapabilityId = existingHomeAssignment.CapabilityId,
            EndDate = DateTimeOffset.MaxValue,
        };
        _repo.Object.UpdateFields(update, existingHomeAssignment);
        Assert.Equal(update.EndDate, existingHomeAssignment.EndDate);
    }

    [Fact]
    public void UpdateHomeAssignmentFields_DoesNotUpdateExpectedFields()
    {
        var ExpectedTeamId = 1;
        var ExpectedCapabilityId = 1;
        var existingHomeAssignment = new HomeAssignment()
        {
            Id = 1,
            TeamId = ExpectedTeamId,
            CapabilityId = ExpectedCapabilityId,
            EndDate = null,
        };
        var update = new HomeAssignment()
        {
            Id = existingHomeAssignment.Id,
            TeamId = 1000,
            CapabilityId = 1000,
            EndDate = DateTimeOffset.MaxValue,
        };
        _repo.Object.UpdateFields(update, existingHomeAssignment);
        Assert.Equal(ExpectedTeamId, existingHomeAssignment.TeamId);
        Assert.Equal(ExpectedCapabilityId, existingHomeAssignment.CapabilityId);
    }
}
