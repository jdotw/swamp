using Base.Repository;

namespace Base.IntegrationTests;

public interface ISeedDataClass<TDbContext>
  where TDbContext : DbContextBase
{
  // Allows for DB initialization before the 
  // start of all tests in a given Test Class.
  // The DB is not re-initialized between tests.
  void InitializeDbForTests(TDbContext db);
}