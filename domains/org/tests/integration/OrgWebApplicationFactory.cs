using Microsoft.AspNetCore.Hosting;
using Base.IntegrationTests;
using Org.Repository;

namespace Org.IntegrationTests;

public class OrgWebApplicationFactory<TProgram>
    : WebApplicationFactoryBase<TProgram, OrgDbContext>
    where TProgram : class
{
  // Override the constructor
  public OrgWebApplicationFactory() : base()
  {
  }

  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    base.ConfigureWebHost(builder);
  }
}