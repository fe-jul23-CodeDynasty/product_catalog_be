export function convertArrayToString(
  array: unknown[],
  separator = '',
  start = 0,
  end = Infinity,
): string {
  return array.slice(start, end).join(separator);
}
