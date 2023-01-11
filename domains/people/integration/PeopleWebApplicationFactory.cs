using System.Data.Common;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Base.IntegrationTests;
using People.Repository;

namespace People.IntegrationTests;

public class PeopleWebApplicationFactory<TProgram>
    : WebApplicationFactoryBase<TProgram, PeopleDbContext>
    where TProgram : class
{
  // Override the constructor
  public PeopleWebApplicationFactory() : base()
  {
  }

  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    base.ConfigureWebHost(builder);
  }
}