using System.Text.Json.Serialization;
using JorgeSerrano.Json;
using Microsoft.EntityFrameworkCore;
using Org.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
  .AddJsonOptions(
      options =>
        {
          options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
          options.JsonSerializerOptions.PropertyNamingPolicy =
             new JsonSnakeCaseNamingPolicy();
        });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<OrgDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("OrgDatabase")));
// .UseSnakeCaseNamingConvention());
builder.Services.AddScoped<ILevelRepository, LevelRepository>();
builder.Services.AddScoped<IDeploymentTypeRepository, DeploymentTypeRepository>();
builder.Services.AddScoped<ICapabilityTypeRepository, CapabilityTypeRepository>();
builder.Services.AddScoped<ICapabilitiesRepository, CapabilitiesRepository>();
builder.Services.AddScoped<ILevelAssignmentRepository, LevelAssignmentRepository>();
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleAssignmentRepository, RoleAssignmentRepository>();
builder.Services.AddScoped<IRoleTypeRepository, RoleTypeRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IHomeAssignmentRepository, HomeAssignmentRepository>();
builder.Services.AddScoped<IManagerAssignmentRepository, ManagerAssignmentRepository>();
builder.Services.AddScoped<IDeploymentRepository, DeploymentRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
