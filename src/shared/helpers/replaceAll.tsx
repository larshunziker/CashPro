export function replaceAll(
  string: string,
  search: string | RegExp,
  replace: string,
): string {
  return string.split(search).join(replace);
}
