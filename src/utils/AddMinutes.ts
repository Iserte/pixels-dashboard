export function AddMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + 1000 * 60 * minutes);
}