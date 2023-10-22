export type ItemType = Record<string, string> & {
  default?: boolean;
  checked?: boolean;
  icon?: "pie" | "tree" | "bar" | "line";
};
