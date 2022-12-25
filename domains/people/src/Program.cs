using People.PostgreSQL;
using People.Services;
using People.Interfaces;
using JorgeSerrano.Json;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
  .AddJsonOptions(
      options =>
        {
          options.JsonSerializerOptions.PropertyNamingPolicy =
             new JsonSnakeCaseNamingPolicy();
        });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PeopleContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PeopleDatabase"))
            .UseSnakeCaseNamingConvention());
builder.Services.AddScoped<IIndividualService, IndividualService>();
builder.Services.AddScoped<ILineManagerService, LineManagerService>();
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
