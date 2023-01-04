using Capability.Repository;

public interface ISeedDataClass
{
  // Allows for DB initialization before the 
  // start of all tests in a given Test Class.
  // The DB is not re-initialized between tests.
  void InitializeDbForTests(CapabilityDbContext db);
}