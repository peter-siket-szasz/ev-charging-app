export function numberToHourFormat(num: number): string {
  return `${num.toString().padStart(2, "0")}:00`;
}
