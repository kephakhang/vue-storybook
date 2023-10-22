/**
 * Defines the available types of buttons.
 * @property {"cross-icon"} cross-icon - A button with a 'x' icon.
 * @property {"sort-asce"} sort-asce - A button for upward-pointing arrow i.e ↑.
 * @property {"sort-desc"} sort-desc - A button for downward-pointing arrow i.e ↓.
 * @property {"restore-icon"} restore-icon - A button for circular arrow i.e ↺.
 * @property {"kebab-menu"} kebab-menu - A button with a vertical ellipsis icon.
 * @property {"information-icon"} information-icon - A button with an information symbol i.e i.
 */

export type ButtonType =
  | "cross-icon"
  | "sort-asce"
  | "sort-desc"
  | "restore-icon"
  | "kebab-menu"
  | "information-icon";

export type ButtonClassTypes = Partial<Record<ButtonType, string>>;
