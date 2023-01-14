using JorgeSerrano.Json;
using Microsoft.EntityFrameworkCore;
using Org.Repository;

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
builder.Services.AddDbContext<OrgDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("OrgDatabase"))
            .UseSnakeCaseNamingConvention());
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IRoleTypeRepository, RoleTypeRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IFunctionTypeRepository, FunctionTypeRepository>();
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
