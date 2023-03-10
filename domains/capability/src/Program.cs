using Capability.Repository;
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

builder.Services.AddDbContext<CapabilityDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("CapabilityDatabase"))
            .UseSnakeCaseNamingConvention());

builder.Services.AddScoped<IChapterRepository, ChapterRepository>();
builder.Services.AddScoped<IChapterRoleRepository, ChapterRoleRepository>();
builder.Services.AddScoped<IChapterRoleTypeRepository, ChapterRoleTypeRepository>();
builder.Services.AddScoped<IPracticeRepository, PracticeRepository>();
builder.Services.AddScoped<IPracticeRoleRepository, PracticeRoleRepository>();
builder.Services.AddScoped<IPracticeRoleTypeRepository, PracticeRoleTypeRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
  var dataContext = scope.ServiceProvider.GetRequiredService<CapabilityDbContext>();
  dataContext.Database.Migrate();
}

app.Run();

public partial class Program { }