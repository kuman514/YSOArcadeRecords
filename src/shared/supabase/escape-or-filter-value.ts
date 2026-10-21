/**
 * PostgREST parses the argument passed to `.or()` as filter syntax, so raw
 * user input embedded in it must be quoted to prevent filter injection.
 * Wrapping the value in double quotes makes PostgREST treat reserved
 * characters (`,`, `(`, `)`, `.`, `:`, etc.) as literals; any backslash or
 * double quote inside the value is escaped so it cannot break out of the
 * quoted string. LIKE/ILIKE wildcards (`%`, `_`) are interpreted at the SQL
 * level and stay effective inside the quotes, so search behavior is preserved.
 */
export function escapeOrFilterValue(value: string): string {
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${escaped}"`;
}
