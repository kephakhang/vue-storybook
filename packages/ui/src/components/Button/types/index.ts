export type ColorType =
  | "blue"
  | "blue-fill"
  | "red"
  | "red-fill"
  | "green"
  | "green-fill"
  | "white";

export type ButtonType =
  | "dropdown"
  | "date-picker"
  | "upload"
  | "export"
  | "text"
  | "text dropdown"
  | "text hyperlink"
  | "custom";

/**
 * @deprecated
 * @param type ImagePosition
 * Note: This is deprecated and will be removed in a future release
 */
export type ImagePosition = "center" | "right" | "left" | "top-right";

export type TypeAttribute = "reset" | "submit" | "button";

export type Size = "normal" | "small" | "large";
