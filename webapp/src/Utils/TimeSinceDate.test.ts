import { timeSinceDate, timeSinceDateString } from "./TimeSinceDate";

describe("timeSinceDate", () => {
  it("should default to the current date for the end date", () => {
    const nullDate = null;
    expect(timeSinceDate(new Date())).toEqual({ years: 0, months: 0, days: 0 });
    expect(timeSinceDate(new Date(), undefined)).toEqual({
      years: 0,
      months: 0,
      days: 0,
    });
  });
  it("should return the correct time between given dates", () => {
    // More than a year (years and months)
    expect(timeSinceDate(new Date(2020, 0, 1), new Date(2023, 2, 1))).toEqual({
      years: 3,
      months: 2,
      days: 0,
    });

    // Less than a year (months)
    expect(timeSinceDate(new Date(2023, 0, 1), new Date(2023, 1, 1))).toEqual({
      years: 0,
      months: 1,
      days: 0,
    });

    // Less than a month (days)
    expect(timeSinceDate(new Date(2023, 0, 1), new Date(2023, 0, 20))).toEqual({
      years: 0,
      months: 0,
      days: 19,
    });
  });
});

describe("timeSinceDateString", () => {
  it("should return the correct string for a given date", () => {
    // More than a year (years and months)
    expect(
      timeSinceDateString(new Date(2020, 0, 1), new Date(2023, 2, 1))
    ).toEqual("3y2m");

    // Less than a year (months)
    expect(
      timeSinceDateString(new Date(2023, 0, 1), new Date(2023, 1, 1))
    ).toEqual("1m");

    // Less than a month (days)
    expect(
      timeSinceDateString(new Date(2023, 0, 1), new Date(2023, 0, 20))
    ).toEqual("19d");
  });
});
