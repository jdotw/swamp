using Delivery.Repository;
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

builder.Services.AddDbContext<DeliveryDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DeliveryDatabase"))
            .UseSnakeCaseNamingConvention());

builder.Services.AddScoped<ISquadRepository, SquadRepository>();
builder.Services.AddScoped<ISquadRoleRepository, SquadRoleRepository>();
builder.Services.AddScoped<ISquadRoleTypeRepository, SquadRoleTypeRepository>();
builder.Services.AddScoped<ITribeRepository, TribeRepository>();
builder.Services.AddScoped<ITribeRoleRepository, TribeRoleRepository>();
builder.Services.AddScoped<ITribeRoleTypeRepository, TribeRoleTypeRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add services to the container.
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
  var dataContext = scope.ServiceProvider.GetRequiredService<DeliveryDbContext>();
  dataContext.Database.Migrate();
}

app.Run();

public partial class Program { }
