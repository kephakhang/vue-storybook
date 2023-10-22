import { all } from "deepmerge";

export function merge(a: unknown, b: unknown) {
  const list = [];

  if (a) list.push(a);
  if (b) list.push(b);

  return all(list);
}
