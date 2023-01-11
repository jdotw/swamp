using Base.Repository;

namespace Base.IntegrationTests;

public interface ISeedDataClass<TDbContext>
  where TDbContext : DbContextBase
{
  // Allows for DB initialization before the 
  // start of all tests in a given Test Class.
  // The DB is not re-initialized between tests.
  //
  // NOTE: The database itself is a single, in-memory
  // instance that is used by all tests and only initialzed
  // once at the start of the test run. Therefore, tests must
  // be contructed to be independent of each other.
  // That is, each test should assume many other unrelated records
  // will be present in the database and match only on identifiers
  // for records it alone has created. 
  void InitializeDbForTests(TDbContext db);
}