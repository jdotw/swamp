#!/bin/sh

# WebApp
cd webapp
npx vitest --run
if [ $? -ne 0 ]; then
  echo "Webapp unit tests failed"
  exit 1
fi
cd ..

# Domains
cd domains

# Domains/People
cd people
cd test
dotnet test
if [ $? -ne 0 ]; then
  echo "People domain unit tests failed"
  exit 1
fi
cd ..
cd ..

# Domain/Delivery
cd delivery
cd integration_tests
dotnet test
if [ $? -ne 0 ]; then
  echo "Delivery integration tests failed"
  exit 1
fi
cd ..
cd test
dotnet test
if [ $? -ne 0 ]; then
  echo "Delivery unit tests failed"
  exit 1
fi
cd ..

# Exit Domains
cd ..
