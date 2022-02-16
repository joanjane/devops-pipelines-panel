export function serializeQueryParams(params: Record<string, string | number>): string {
  return Object.keys(params)
    .filter(k => params[k] != null)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .reduce((a, b) => `${a}&${b}`, '');
}
