import type { StyleValue } from "~/types/common";

/**
 * export size of tab number small or large
 */
export type TabNumberSize = "small" | "large";

/**
 * export style of tab number horizontal or vertical
 */
export type TabNumberStyle = "horizontal" | "vertical";

/**
 * export tab button type
 */
export type TabButtonType = {
  title: string;
  icon: string;
  itemRate: number | string;
  active?: boolean;
  iconStyle?: StyleValue;
};
