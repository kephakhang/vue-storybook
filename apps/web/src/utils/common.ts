export * from "./initializeApp";

export async function asyncGuard<T>(
  callback: () => Promise<T>
): Promise<[T, null] | [null, unknown]> {
  try {
    const res = await callback();
    return [res, null];
  } catch (error) {
    return [null, error];
  }
}

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const divisions = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
] as const;

export function getRelativeTime(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }

  throw new Error(`Unexpected date ${date.toString()}`);
}
