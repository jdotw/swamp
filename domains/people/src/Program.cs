using JorgeSerrano.Json;
using Microsoft.EntityFrameworkCore;
using People.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
  .AddJsonOptions(
      options =>
        {
          options.JsonSerializerOptions.PropertyNamingPolicy =
             new JsonSnakeCaseNamingPolicy();
        });

var corsPolicyName = "corsPolicy";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: corsPolicyName,
      policy =>
      {
        policy.WithOrigins("http://localhost:5173")
              .WithMethods("PUT", "DELETE", "GET");
      });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PeopleDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PeopleDatabase"))
            .UseSnakeCaseNamingConvention());
builder.Services.AddScoped<IIndividualRepository, IndividualRepository>();
builder.Services.AddScoped<ILineManagerRepository, LineManagerRepository>();
builder.Services.AddScoped<IOrgUnitRepository, OrgUnitRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors(corsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }