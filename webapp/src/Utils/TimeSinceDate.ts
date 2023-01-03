export type TimeDelta = {
  years: number;
  months: number;
  days: number;
};

export const timeSinceDate = (startDate: Date, endDate?: Date): TimeDelta => {
  if (!endDate) {
    endDate = new Date();
  }
  const monthDiff =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  if (monthDiff == 0) {
    // Less than a month (days)
    const daysDiff = endDate.getDate() - startDate.getDate();
    return { years: 0, months: 0, days: daysDiff };
  } else if (monthDiff < 12) {
    // Less than a year (months)
    return { years: 0, months: monthDiff, days: 0 };
  } else {
    // More than a year (years and months)
    const years = Math.floor(monthDiff / 12);
    const months = monthDiff % 12;
    return { years, months, days: 0 };
  }
};

export const timeSinceDateString = (
  startDate: Date,
  endDate: Date = new Date()
) => {
  const diff = timeSinceDate(startDate, endDate);
  if (diff.years > 0) {
    return `${diff.years}y${diff.months}m`;
  } else if (diff.months > 0) {
    return `${diff.months}m`;
  } else if (diff.days > 0) {
    return `${diff.days}d`;
  }
};
